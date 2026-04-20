import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyByJWXyLj2BsUqlrrNowcgPitx_1DtljZc",
  authDomain: "website-48a63.firebaseapp.com",
  projectId: "website-48a63",
  storageBucket: "website-48a63.firebasestorage.app",
  messagingSenderId: "589797458847",
  appId: "1:589797458847:web:7c3bb6314c1d5a08ad73aa",
  measurementId: "G-CZSYX0DXZG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const auth = getAuth(app);