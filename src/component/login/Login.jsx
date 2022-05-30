import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  Stack,
  Link,
  TextField,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Joi from "joi";

const LoginBox = styled(Box)(() => ({
  backgroundImage:
    "url('https://images.pexels.com/photos/256273/pexels-photo-256273.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",

  height: "calc(100vh - 85px)",
  width: "100%",
}));

const Login = () => {
  const navigate = useNavigate();

  const [loginUserData, setLoginUserData] = useState({
    email: "",
    password: "",
  });
  const [errorList, setErrorList] = useState([]);
  const [error, setError] = useState("");

  const validateLoginForm = (user) => {
    const schema = Joi.object({
      password: Joi.string().required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
    });

    return schema.validate(user, { abortEarly: false });
  };

  const { isLoading,dispatch } = useContext(Context);

  const setUserData = (e) => {
    const userData = { ...loginUserData };
    userData[e.target.name] = e.target.value;

    setLoginUserData(userData);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    let validationLoginFormResult = validateLoginForm(loginUserData);
    if (validationLoginFormResult.error) {
      setErrorList(validationLoginFormResult.error.details);
    } else {
      setErrorList([]);
      try {
        const { data } = await axios.post(
          "https://blogger-node-app.herokuapp.com/api/auth/login",
          loginUserData
        );

        dispatch({ type: "LOGIN_SUCCESS", payload: data.user });
        navigate("/");
      } catch (err) {
        setError(err.response.data.message);
        dispatch({ type: "LOGIN_FAILURE" });
      }
    }
  };

  return (
    <LoginBox>
      <Stack
        component="form"
        spacing={2}
        noValidate
        autoComplete="off"
        onSubmit={handleLogin}
        sx={{
          width: {
            xs: "30vh",
            md: "50vh",
          },
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "10px",
          margin: "auto",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          textAlign: "center",
        }}
      >
        <Typography variant="h3" gutterBottom component="h3">
          Login
        </Typography>
        {errorList.map((error, index) => {
          return error.message ? (
            <Alert severity="error" key={index}>
              {error.message}
            </Alert>
          ) : (
            ""
          );
        })}

        {error ? <Alert severity="error">{error}</Alert> : ""}
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          name="email"
          onChange={(e) => setUserData(e)}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          onChange={(e) => setUserData(e)}
        />
        <Button variant="contained" color="success" type="submit" disabled={isLoading}>
          {isLoading ? <CircularProgress color="inherit" /> : 'Login' }
        </Button>
        <Typography variant="p" gutterBottom component="p" mt={4}>
          Are You Not Have A Account?{" "}
          <Link href="#" underline="none">
            Register
          </Link>
        </Typography>
      </Stack>
    </LoginBox>
  );
};

export default Login;
