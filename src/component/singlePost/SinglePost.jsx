import { Delete, Edit } from "@mui/icons-material";
import { Box, CircularProgress, IconButton, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Context } from "../../context/Context";

const SinglePost = () => {
  const navigate = useNavigate();
  const { user } = useContext(Context);
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [isLoading,setIsLoading]= useState(false);
  const fetchPost = async () => {
    setIsLoading(true);
    const { data } = await axios.get(
      `https://blogger-node-app.herokuapp.com/api/posts/${id}`
    );
    setPost(data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchPost();
  }, []);

  

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://blogger-node-app.herokuapp.com/api/posts/${id}`,
        {
          data: { username: user.username },
        }
      );
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  // src={
  //   "https://blogger-node-app.herokuapp.com/images/" + post.postImage
  // }
  return (
    <Box>
      {isLoading ? <Box sx={{ display: 'flex', justifyContent:"center",alignItems:"center" }}>
      <CircularProgress />
    </Box> :<>
    {post.postImage && (
        <img
          src={
            "https://blogger-node-app.herokuapp.com/images/" + post.postImage
          }
          width="100%"
          height="400px"
          alt="post images"
        />
      )}

      <Box
        sx={{
          position: "relative",
        }}
        mt={3}
      >
        <Typography variant="h4" gutterBottom component="h4" textAlign="center">
          {post.title}
        </Typography>
        
        {post.username === (user && user.username) && (
          <Stack
            direction="row"
            spacing={1}
            sx={{
              position: {
                sm: "static",
                md: "absolute",
              },
              justifyContent: {
                xs: "center",
              },
              top: "0",
              right: "0",
            }}
          >
            <IconButton
              aria-label="delete"
              size="large"
              onClick={() => handleDelete()}
            >
              <Delete />
            </IconButton>
            <IconButton aria-label="delete" size="large">
              <Link
                style={{ textDecoration: "none", color: "#757575" }}
                to={`/editpost/${post._id}`}
              >
                <Edit />
              </Link>
            </IconButton>
          </Stack>
        )}
      </Box>
      <Stack direction="row" justifyContent="space-between" mt={3}>
        <Typography variant="p" gutterBottom component="p">
          Author:{" "}
          <Link
            style={{
              textDecoration: "none",
              color: "#000",
              fontWeight: "bold",
            }}
            to={`/?username=${post.username}`}
          >
            {post.username}
          </Link>
        </Typography>
        <Typography variant="p" gutterBottom component="p">
          {new Date(post.createdAt).toDateString()}
        </Typography>
      </Stack>
      <Typography
        variant="p"
        gutterBottom
        component="p"
        mt={3}
        lineHeight={1.7}
      >
        {post.description}
      </Typography>
    </>}

      {/* {post.postImage && (
        <img
          src={
            "https://blogger-node-app.herokuapp.com/images/" + post.postImage
          }
          width="100%"
          height="400px"
          alt="post images"
        />
      )}

      <Box
        sx={{
          position: "relative",
        }}
        mt={3}
      >
        <Typography variant="h4" gutterBottom component="h4" textAlign="center">
          {post.title}
        </Typography>
        
        {post.username === (user && user.username) && (
          <Stack
            direction="row"
            spacing={1}
            sx={{
              position: {
                sm: "static",
                md: "absolute",
              },
              justifyContent: {
                xs: "center",
              },
              top: "0",
              right: "0",
            }}
          >
            <IconButton
              aria-label="delete"
              size="large"
              onClick={() => handleDelete()}
            >
              <Delete />
            </IconButton>
            <IconButton aria-label="delete" size="large">
              <Link
                style={{ textDecoration: "none", color: "#757575" }}
                to={`/editpost/${post._id}`}
              >
                <Edit />
              </Link>
            </IconButton>
          </Stack>
        )}
      </Box>
      <Stack direction="row" justifyContent="space-between" mt={3}>
        <Typography variant="p" gutterBottom component="p">
          Author:{" "}
          <Link
            style={{
              textDecoration: "none",
              color: "#000",
              fontWeight: "bold",
            }}
            to={`/?username=${post.username}`}
          >
            {post.username}
          </Link>
        </Typography>
        <Typography variant="p" gutterBottom component="p">
          {new Date(post.createdAt).toDateString()}
        </Typography>
      </Stack>
      <Typography
        variant="p"
        gutterBottom
        component="p"
        mt={3}
        lineHeight={1.7}
      >
        {post.description}
      </Typography> */}
    </Box>
  );
};

export default SinglePost;
