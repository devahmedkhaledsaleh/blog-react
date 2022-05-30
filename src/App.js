import Navbar from "./component/navbar/Navbar";
import Login from "./page/login/Login";
import Home from "./page/home/Home";
import Register from "./page/register/Register";
import Settings from "./page/seetings/Settings";
import Addpost from "./page/addPost/Addpost";
import SinglePost from "./page/singlePost/SinglePost";
import { Navigate, Route, Routes } from "react-router-dom";
import Editpost from "./page/editPost/Editpost";
import { Context } from "./context/Context";
import { useContext } from "react";

function App() {
  const { user } = useContext(Context);

  function ProtectedRoute({ children }) {
    if (!user) {
      return <Navigate to="/login" />;
    } else {
      return children;
    }
  }

  function UserIsLogin({ children }) {
    if (!user) {
      return children;
    } else {
      return <Navigate to="/home" />;
    }
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <UserIsLogin>
              <Login />
            </UserIsLogin>
          }
        />
        <Route
          path="/register"
          element={
            <UserIsLogin>
              <Register />
            </UserIsLogin>
          }
        />
        <Route path="/settings" element={<Settings />} />
        <Route
          path="/addpost"
          element={
            <ProtectedRoute>
              <Addpost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editpost/:id"
          element={
            <ProtectedRoute>
              <Editpost />
            </ProtectedRoute>
          }
        />
        <Route path="/posts/:id" element={<SinglePost />} />
      </Routes>
    </>
  );
}

export default App;
