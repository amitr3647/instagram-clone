import React from "react";
import "./Post.css";
import image1 from "./images/pexels-david-besh-884788.jpg";
import Avatar from "@mui/material/Avatar";
function Post({ username, caption, imageUrl }) {
  return (
    <div className="post">
      <div className="post__header">
        <Avatar alt={username} src="s" />
        <h2>{username}</h2>
      </div>

      <img className="post__image" src={imageUrl}></img>

      <h3 className="post__caption">
        <strong> {username} </strong>
        {caption}
      </h3>
    </div>
  );
}

export default Post;
