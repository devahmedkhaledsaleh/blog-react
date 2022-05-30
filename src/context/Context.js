import Reducer from "./Reducer";

const { createContext, useReducer, useEffect } = require("react");

const INITIAL_VALUE = {
  isLoading: false,
  user: JSON.parse(localStorage.getItem("bloggerUser")) || null,
  error: false,
};

export const Context = createContext(INITIAL_VALUE);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer,INITIAL_VALUE);

  useEffect(()=>{
   
     localStorage.setItem("bloggerUser",JSON.stringify(state.user))
  },[state.user]);
  
  return (
    <Context.Provider
      value={{
        isLoading: state.isLoading,
        user: state.user,
        error: state.error,
        dispatch
      }}
    >
        
      {children}
    </Context.Provider>
  );
};
