import * as React from "react";
import "./ModalBox.css";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import SignUpModal from "./SignUpModal";
import SignInModal from "./SignInModal";
const auth = getAuth();

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  background: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModalBox({
  open,
  setOpen,
  openSignIn,
  setOpenSignIn,
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  user,
  setUser,
}) {
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      console.log("changed user", authUser);
      if (authUser) {
        console.log("user exists", authUser);
        setUser(authUser);
      } else {
        console.log("user signed out");
        setUser(null);
      }
    });
    return () => {
      //performing cleanup
      unsubscribe();
    };
  }, [user, username]);

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        updateProfile(authUser.user, {
          displayName: username,
        });
        console.log("authuser", authUser);
      })
      .catch((error) => {
        alert(error.message);
        // ..
      });
    setUsername("");
    setEmail("");
    setPassword("");
    setOpen(false);
  };
  const signIn = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password).catch((error) =>
      alert(error.message)
    );
    setEmail("");
    setPassword("");
    setOpenSignIn(false);
  };
  return (
    <>
      <SignUpModal
        open={open}
        setOpen={setOpen}
        username={username}
        setUsername={setUsername}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        user={user}
        setUser={setUser}
        modalStyle={modalStyle}
        signUp={signUp}
      />
      <SignInModal
        openSignIn={openSignIn}
        setOpenSignIn={setOpenSignIn}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        user={user}
        setUser={setUser}
        modalStyle={modalStyle}
        signIn={signIn}
      />
    </>
  );
}
