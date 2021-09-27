import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
const firebaseApp = initializeApp({
  apiKey: "AIzaSyDV6RYvsBw8niq6kfPK41i7m_ht6-jzBlo",
  authDomain: "instagram-clone-4ac24.firebaseapp.com",
  projectId: "instagram-clone-4ac24",
  storageBucket: "instagram-clone-4ac24.appspot.com",
  messagingSenderId: "321862720226",
  appId: "1:321862720226:web:72cefc56262026eb7f5cbb",
});

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);
export { db, auth, storage };
