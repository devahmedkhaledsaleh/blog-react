import { Facebook, Instagram, Pinterest, Twitter } from "@mui/icons-material";
import { Button, Divider, Stack, Typography } from "@mui/material";
import LinkMui from "@mui/material/Link";
import { useParams, useNavigate, Link } from "react-router-dom";

import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";



const Sidebar = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const { data } = await axios.get("https://blogger-node-app.herokuapp.com/api/categories");
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Box
      sx={{ backgroundColor: "#FDFBFB", padding: "20px", textAlign: "center" }}
    >
      <Box mb={5}>
        <Typography variant="h3" gutterBottom component="h3">
          About
        </Typography>
        <Typography variant="p" gutterBottom component="p">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
          delectus, aliquid animi dicta facilis blanditiis explicabo quaerat
          eaque at vel officia eum maiores ex asperiores cupiditate nesciunt
          pariatur? Quaerat, assumenda!
        </Typography>
      </Box>
      <Divider />
      <Box mb={5} mt={5}>
        <Typography variant="h3" gutterBottom component="h3">
          Categories
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          flexWrap="wrap"
          justifyContent="space-between"
          rowGap={2}
        >
          {categories.map((category) => {
            return (
              <Link
                style={{ textDecoration: "none" }}
                to={`/?categoryName=${category.title}`}
                key={category._id}
              >
                <Button sx={{ my: 1, color: "#1976d2", display: "block" }}>
                  {category.title}
                </Button>
              </Link>
            );
          })}
        </Stack>
      </Box>
      <Divider />
      <Box mb={5} mt={5}>
        <Typography variant="h3" gutterBottom component="h3">
          Follow Us
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          flexWrap="wrap"
          justifyContent="center"
          gap={2}
        >
          <LinkMui href="#" sx={{ color: "#000" }}>
            <Facebook />
          </LinkMui>
          <LinkMui href="#" sx={{ color: "#000" }}>
            <Twitter />
          </LinkMui>
          <LinkMui href="#" sx={{ color: "#000" }}>
            <Instagram />
          </LinkMui>

          <LinkMui href="#" sx={{ color: "#000" }}>
            <Pinterest />
          </LinkMui>
        </Stack>
      </Box>
    </Box>
  );
};

export default Sidebar;
