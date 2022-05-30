import { Container, Grid } from "@mui/material";
import React from "react";
import Sidebar from "../../component/sidebar/Sidebar";
import SinglePostComponent from "../../component/singlePost/SinglePost";

const SinglePost = () => {
  return (
    <>
      <Container>
        <Grid container spacing={2} mt={5}>
          <Grid item md={8}>
            <SinglePostComponent />
          </Grid>
          <Grid item md={4}>
            <Sidebar />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default SinglePost;
