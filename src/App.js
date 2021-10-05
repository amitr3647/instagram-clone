import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { db } from "./firebase";
import { collection, orderBy } from "firebase/firestore";
import { doc, onSnapshot } from "firebase/firestore";
import ModalBox from "./ModalBox";
import Header from "./Header";
import { Button } from "@mui/material";
import { getAuth, signOut } from "@firebase/auth";
import ImageUpload from "./ImageUpload";
function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false); //this is for opening signup modal
  const [openSignIn, setOpenSignIn] = useState(false); //this is for opening signin modal
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    onSnapshot(
      collection(db, "posts"),
      orderBy("timestamp", "desc"),
      (snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      }
    );
  }, []);
  const auth = getAuth();
  return (
    <div className="app">
      <Header />
      {user ? (
        <Button onClick={() => signOut(auth)}>Log Out</Button>
      ) : (
        <div className="login__container">
          <Button onClick={() => setOpenSignIn(true)}>Log In</Button>
          <Button onClick={() => setOpen(true)}>Sign up</Button>
        </div>
      )}
      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <h1>Login to upload..</h1>
      )}
      <ModalBox
        open={open}
        setOpen={setOpen}
        openSignIn={openSignIn}
        setOpenSignIn={setOpenSignIn}
        username={username}
        setUsername={setUsername}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        user={user}
        setUser={setUser}
      />
      {posts.map(({ id, post }) => {
        return (
          <Post
            key={id}
            postId={id}
            username={post.username}
            caption={post.caption}
            imageUrl={post.imageUrl}
            id={post.id}
          />
        );
      })}
    </div>
  );
}

export default App;
