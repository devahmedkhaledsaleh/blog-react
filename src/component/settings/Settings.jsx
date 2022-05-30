import {
  Avatar,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import axios from "axios";

const Input = styled("input")({
  display: "none",
});

const Settings = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    profileImage: "",
  });

  useEffect(() => {
    setUserData({ ...user });
  }, []);

  const setUsername = (e) => {
    const newData = { ...user };
    newData[e.target.name] = e.target.value;
    setUserData(newData);
  };

  const setEmail = (e) => {
    const newData = { ...user };
    newData[e.target.name] = e.target.value;
    setUserData(newData);
  };

  const setPassword = (e) => {
    const newData = { ...user };
    newData[e.target.name] = e.target.value;
    setUserData(newData);
  };

  const { user, dispatch } = useContext(Context);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedData = { ...userData };
    try {
      if (file) {
        const formData = new FormData();
        const fileName = Date.now() + file.name;
        formData.append("name", fileName);
        formData.append("file", file);
        updatedData.profileImage = fileName;
        try {
          await axios.post("https://blogger-node-app.herokuapp.com/api/upload", formData);
        } catch (err) {
          console.log(err);
        }
      }
      const { data } = await axios.patch(
        `https://blogger-node-app.herokuapp.com/api/users/${user._id}`,
        updatedData
      );
      dispatch({ type: "UPDATE_SUCCESS", payload: data });
      navigate("/");
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
      console.log(err);
    }
  };

  return (
    <Box mt={5}>
      <Typography variant="h4" gutterBottom component="h4">
        Update You Account
      </Typography>
      <Stack
        component="form"
        spacing={2}
        noValidate
        autoComplete="off"
        encType="multipart/form-data"
        onSubmit={handleUpdateUser}
      >
        <Box>
          <Typography variant="h6" gutterBottom component="h6">
            Profile Picture
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              alt="Remy Sharp"
              src={
                file
                  ? URL.createObjectURL(file) : userData.profileImage ? `https://blogger-node-app.herokuapp.com/images/${userData.profileImage}`
                  : ``
              }
              sx={{ width: 100, height: 100 }}
            />
            <label htmlFor="contained-button-file">
              <Input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                name="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <Button variant="contained" component="span">
                Upload
              </Button>
            </label>
          </Stack>
        </Box>
        <TextField
          label="Username"
          variant="outlined"
          name="username"
          value={userData.username}
          onChange={(e) => setUsername(e)}
        />
        <TextField
          label="Email"
          variant="outlined"
          name="email"
          value={userData.email}
          onChange={(e) => setEmail(e)}
        />
        <TextField
          label="Password"
          variant="outlined"
          name="password"
          onChange={(e) => setPassword(e)}
        />
        <Button variant="contained" color="success" type="submit">
          Update Data
        </Button>
      </Stack>
    </Box>
  );
};

export default Settings;
