import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, doc } from "@firebase/firestore";
import "./Post.css";
import image1 from "./images/pexels-david-besh-884788.jpg";
import Avatar from "@mui/material/Avatar";
import { onSnapshot } from "@firebase/firestore";
function Post({ username, caption, imageUrl, postId }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = doc(db, "posts", postId);

      onSnapshot(collection(db, "posts", postId, "comments"), (snapshot) => {
        console.log("amit", snapshot);
        setComments(snapshot.docs.map((doc) => doc.data()));
      });
    }
  }, [postId]);
  //adding comment on clicking  the post button
  const postComment = (event) => {
    event.preventDefault();
  };

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
      <div className="post_comments">
        {comments.map((comment) => (
          // <p>{comment.username}</p>
          <p>
            <b>{comment.username}</b>
            {comment.text}
          </p>
        ))}
      </div>
      <form>
        <input
          className="post_input"
          type="text"
          placeholder="add a comment...."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></input>
        <button
          className="post_button"
          disabled={!comment}
          type="submit"
          onClick={postComment}
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default Post;
