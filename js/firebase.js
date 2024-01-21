import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth , signInWithEmailAndPassword ,createUserWithEmailAndPassword , onAuthStateChanged , signOut} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getStorage , ref, uploadBytesResumable , getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
import {getFirestore , collection , addDoc , query , where , getDocs , getDoc , doc , serverTimestamp ,updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

 const firebaseConfig = {

};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);


export{
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  db,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
  signOut
}