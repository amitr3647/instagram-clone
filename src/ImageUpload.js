import { Button } from "@mui/material";
import "./ImageUpload.css";
import React, { useState } from "react";
import { storage, db } from "./firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { serverTimestamp } from "@firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
export default function ImageUpload({ username }) {
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");
  const storageRef = ref(storage, `images/${image.name}`);
  //   console.log("storageRef", storageRef);

  const handleUpload = () => {
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //progress function
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setProgress(progress);
      },

      (error) => {
        // Handle unsuccessful uploads
        alert(error.message);
      },
      () => {
        // Handle successful uploads on complete

        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const docRef = addDoc(collection(db, "posts"), {
            timestamp: serverTimestamp(),
            caption: caption,
            imageUrl: downloadURL,
            username: username,
          });
          console.log("aaa", docRef, downloadURL);
        });
        setProgress(0);
        setCaption("");
        setImage("");
      }
    );
  };
  const changeHandler = (e) => {
    console.log("e", e.target.files[0]);
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  return (
    <div className="image_upload">
      {/* caption input */}
      {/* file picker */}
      {/* post button */}
      <progress value={progress} max="100"></progress>
      <input
        type="text"
        placeholder="enter caption"
        onChange={(e) => setCaption(e.target.value)}
      ></input>
      <input type="file" onChange={changeHandler}></input>
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
}
