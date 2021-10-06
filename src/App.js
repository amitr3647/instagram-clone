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
import InstagramEmbed from "react-instagram-embed";
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
      <Header user={user} setOpen={setOpen} setOpenSignIn={setOpenSignIn} />
      {/* {user ? (
        <Button onClick={() => signOut(auth)}>Log Out</Button>
      ) : (
        <div className="login__container">
          <Button onClick={() => setOpenSignIn(true)}>Log In</Button>
          <Button onClick={() => setOpen(true)}>Sign up</Button>
        </div>
      )}*/}
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
      <div className="post_container">
        <div className="post_container_left">
          {posts.map(({ id, post }) => {
            return (
              <Post
                key={id}
                postId={id}
                username={post.username}
                caption={post.caption}
                imageUrl={post.imageUrl}
                id={post.id}
                user={user}
              />
            );
          })}
        </div>
        <div className="post_container_right">
          {/* <InstagramEmbed
            url="https://www.instagram.com/iamitkr25/"
            clientAccessToken="176379611293832|IGQVJWQ0t6U0R2MXh4UFdzZATBuM2JneHJOYlFWSkY0U25DN3RGZAlZAqSHY3QWNscGNCanVuUVNaZA0x1Q19qRTF6RERwOWtNeHZAYTzlOMTJuWGZA0Q1JWWVl3aGxqdmJxNzYzM2VJbXU5MFMzNHlvb3BaVAZDZD"
            maxWidth={320}
            hideCaption={false}
            containerTagName="div"
            protocol=""
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          /> */}
        </div>
      </div>
    </div>
  );
}

export default App;
