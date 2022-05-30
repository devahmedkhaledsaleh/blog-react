import { styled } from "@mui/material/styles";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Joi from "joi";

const RegisterBox = styled(Box)(() => ({
  backgroundImage:
    "url('https://images.pexels.com/photos/256273/pexels-photo-256273.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",

  height: "calc(100vh - 85px)",
  width: "100%",
}));
const Register = () => {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errorList, setErrorList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const validateLoginForm = (user) => {
    const schema = Joi.object({
      username: Joi.string().required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string().required(),
    });

    return schema.validate(user, { abortEarly: false });
  };

  const setUserData = (e) => {
    const userData = { ...user };
    userData[e.target.name] = e.target.value;
    setUser(userData);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let validationLoginFormResult = validateLoginForm(user);
    if (validationLoginFormResult.error) {
      setErrorList(validationLoginFormResult.error.details);
    } else {
      setErrorList([]);
      try {
        const { data } = await axios.post(
          "https://blogger-node-app.herokuapp.com/api/auth/register",
          user
        );
        setIsLoading(false);
        navigate("../login");
      } catch (err) {
        setError(err.response.data.message);
      }
    }
  };

  return (
    <RegisterBox>
      <Stack
        component="form"
        spacing={2}
        noValidate
        autoComplete="off"
        onSubmit={handleRegister}
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
          Register
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
          label="Username"
          variant="outlined"
          name="username"
          onChange={(e) => setUserData(e)}
        />
        <TextField
          label="Email"
          variant="outlined"
          name="email"
          type="email"
          onChange={(e) => setUserData(e)}
        />
        <TextField
          label="Password"
          variant="outlined"
          name="password"
          type="password"
          onChange={(e) => setUserData(e)}
        />
        <Button variant="contained" color="success" type="submit" disabled={isLoading}>
          {isLoading ? <CircularProgress color="inherit" /> : "Register"}
        </Button>
        <Typography variant="p" gutterBottom component="p" mt={4}>
          Are You Have A Account?
          <Link href="#" underline="none">
            Login
          </Link>
        </Typography>
      </Stack>
    </RegisterBox>
  );
};

export default Register;
