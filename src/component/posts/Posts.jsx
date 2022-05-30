import React from "react";
import Post from "../post/Post";
import Grid from "@mui/material/Grid";

const Posts = ({ posts }) => {
  return (
    <>
      <Grid container spacing={4}>
        {posts.map((post) => {
          return (
            <Grid item sm={6} key={post._id}>
              <Post post={post} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default Posts;
