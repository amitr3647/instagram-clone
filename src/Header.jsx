import "./Header.css";
import { auth } from "./firebase";
import { getAuth, signOut } from "@firebase/auth";
import ImageUpload from "../src/ImageUpload";
import { doc, onSnapshot } from "firebase/firestore";

import { Button } from "@mui/material";
export default function Header({ user, setOpen, setOpenSignIn }) {
  return (
    <>
      <div className="app__header">
        <img
          className="app__headerImage"
          src="	https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="instagram-logo"
        ></img>
        {user ? (
          <Button onClick={() => signOut(auth)}>Log Out</Button>
        ) : (
          <div className="login__container">
            <Button onClick={() => setOpenSignIn(true)}>Log In</Button>
            <Button onClick={() => setOpen(true)}>Sign up</Button>
          </div>
        )}
      </div>
    </>
  );
}
