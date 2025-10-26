// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDj2jzoyee9rYBMEQXE_UPL7eshRZ9a3gU",
  authDomain: "student-teacher-appointm-2af32.firebaseapp.com",
  projectId: "student-teacher-appointm-2af32",
  storageBucket: "student-teacher-appointm-2af32.firebasestorage.app",
  messagingSenderId: "558624743527",
  appId: "1:558624743527:web:3f0798a2354f47c148f4c2",
  measurementId: "G-7VPQHR4QWJ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  doc,
  setDoc,
  getDoc,
};
