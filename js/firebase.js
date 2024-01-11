import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

 const firebaseConfig = {
  apiKey: "AIzaSyCE4_oje0ZknaKX1xU2-8ZMR594CBjF4oM",
  authDomain: "smit-ba688.firebaseapp.com",
  databaseURL: "https://smit-ba688-default-rtdb.firebaseio.com",
  projectId: "smit-ba688",
  storageBucket: "smit-ba688.appspot.com",
  messagingSenderId: "1014681951996",
  appId: "1:1014681951996:web:93bcec13ac2e8b709c4179"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);


export{
  auth,
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
}