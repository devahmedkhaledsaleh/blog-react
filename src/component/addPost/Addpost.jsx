import { styled } from "@mui/material/styles";
import {
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Joi from "joi";

const Input = styled("input")({
  display: "none",
});

const Addpost = () => {
  const navigate = useNavigate();

  const [errorList, setErrorList] = useState([]);
  const [error, setError] = useState("");

  const validateLoginForm = (post) => {
    const schema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      postImage: Joi.string().required(),
      category: Joi.string().required(),
      username: Joi.string().required(),
    });

    return schema.validate(post, { abortEarly: false });
  };

  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    const { data } = await axios.get("https://blogger-node-app.herokuapp.com/api/categories");
    setCategories(data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const [post, setPost] = useState({
    title: "",
    description: "",
    postImage: "",
    username: "",
    category: "",
  });
  const [file, setFile] = useState(null);

  const { user } = useContext(Context);

  const setTitle = (e) => {
    const postData = { ...post };

    postData[e.target.name] = e.target.value;

    setPost(postData);
  };

  const setDescription = (e) => {
    const postData = { ...post };

    postData[e.target.name] = e.target.value;

    setPost(postData);
  };


  const setCategory = (e) => {
    const postData = { ...post };

    postData[e.target.name] = e.target.value;

    setPost(postData);
  };

  const handleAddPost = async (e) => {
    e.preventDefault();
    const newPost = { ...post, username: user.username };

    if (file) {
      const formData = new FormData();
      const fileName = Date.now() + file.name;
      formData.append("name", fileName);
      formData.append("file", file);
      newPost.postImage = fileName;

      try {
        await axios.post("https://blogger-node-app.herokuapp.com/api/upload", formData);
      } catch (err) {
        console.log(err);
      }
    }
      let validationLoginFormResult = validateLoginForm(newPost);
    if (validationLoginFormResult.error) {
      setErrorList(validationLoginFormResult.error.details);
      console.log(validationLoginFormResult.error.details);
    } else {
      setErrorList([]);

      try {

        const { data } = await axios.post(
          "https://blogger-node-app.herokuapp.com/api/posts",
          newPost
        );
  
        navigate("/posts/" + data._id);

      } catch(err) {
        setError(err.response.data.message);
      }

    }

      
    
  
  };

  return (
    <Box mt={5}>
      <Stack
        component="form"
        spacing={2}
        noValidate
        autoComplete="off"
        encType="multipart/form-data"
        onSubmit={handleAddPost}
      >
        <Typography variant="h3" gutterBottom component="h3">
          Add New Post
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
          label="Post Title"
          variant="outlined"
          name="title"
          onChange={(e) => setTitle(e)}
        />
        <TextField
          id="outlined-textarea"
          label="Post Description"
          placeholder="Post Description"
          rows={6}
          multiline
          name="description"
          onChange={(e) => setDescription(e)}
        />

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Categories"
            name="category"
            defaultValue=""
            onChange={(e)=>setCategory(e)}
          >
            {categories &&
              categories.map((category) => {
                return (
                  <MenuItem value={category.title} key={category._id}>
                    {category.title}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>

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
            Upload Image
          </Button>
        </label>
        {file && (
          <img
            src={URL.createObjectURL(file)}
            width="200px"
            height="200px"
            alt="post images"
          />
        )}

        <Button variant="contained" color="success" type="submit">
          Add Post
        </Button>
      </Stack>
    </Box>
  );
};

export default Addpost;
