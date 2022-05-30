import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  return (
    <Card>
      {post.postImage && (
        <CardMedia
          component="img"
          height="250"
          image={`https://blogger-node-app.herokuapp.com/images/${post.postImage}`}
          alt={post.title}
        />
      )}

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Link style={{ textDecoration: "none" }} to={`/posts/${post._id}`}>
          <Button sx={{ my: 1, color: "#1976d2", display: "block" }}>
            Show More
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default Post;
