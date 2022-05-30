import React, { useEffect, useState } from "react";
import Header from "../../component/header/Header";
import Grid from "@mui/material/Grid";
import Posts from "../../component/posts/Posts";
import Sidebar from "../../component/sidebar/Sidebar";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { Container, Skeleton } from "@mui/material";
import { Box } from "@mui/system";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let [searchParams] = useSearchParams();

  const fetchPosts = async () => {
    setIsLoading(true);
    const { data } = await axios.get(
      "https://blogger-node-app.herokuapp.com/api/posts/?" + searchParams
    );
    setPosts(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [searchParams]);

  return (
    <>
      <Header />
      <Container>
        <Grid container spacing={2} mt={5}>
          <Grid item md={8}>
            {isLoading ? (
              <Grid container spacing={2}>
                {[1, 2, 3, 4].map((item, index) => (
                  <Grid item sm={6}>
                    <Box>
                      <Skeleton variant="rectangular" height={118} />
                      <Skeleton />
                      <Skeleton width="65%" />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Posts posts={posts} />
            )}
          </Grid>
          <Grid item md={4}>
            <Sidebar />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
