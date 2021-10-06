import React, { useEffect, useState } from "react";
import { addDoc } from "firebase/firestore";
import { db } from "./firebase";
import { collection, doc, orderBy } from "@firebase/firestore";
import "./Post.css";
import image1 from "./images/pexels-david-besh-884788.jpg";
import Avatar from "@mui/material/Avatar";
import { onSnapshot } from "@firebase/firestore";
function Post({ username, user, caption, imageUrl, postId }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = doc(db, "posts", postId);

      onSnapshot(
        collection(db, "posts", postId, "comments"),
        orderBy("date", "desc"),
        (snapshot) => {
          // console.log("amit", snapshot);
          setComments(snapshot.docs.map((doc) => doc.data()));
        }
      );
    }
  }, [postId]);
  //adding comment on clicking  the post button
  const postComment = (event) => {
    event.preventDefault();
    if (user) {
      const docRef = addDoc(collection(db, "posts", postId, "comments"), {
        text: comment,
        username: user.displayName,
      });
      setComment("");
    } else {
      console.log("error");
      setComment("");

      return alert("You are not logged");
    }
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
          <p>
            <b>{comment.username}</b>
            {comment.text}
          </p>
        ))}
      </div>
      <form className="post_comment_box">
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
