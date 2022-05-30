import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import React from "react";

const BoxHeader = styled(Box)(() => ({
  backgroundImage:
    "url('https://images.pexels.com/photos/256273/pexels-photo-256273.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
  height: "50vh",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  filter: "grayscale(1)",
  color: "#fff",
  backgroundPosition: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  "& h2": {
    fontWeight: "700",
  },
}));

const Header = () => {
  return (
    <BoxHeader>
      <Typography variant="h2" gutterBottom component="h2">
        BLOG
      </Typography>
    </BoxHeader>
  );
};

export default Header;
