import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-auth.js";

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
export const authenticator = getAuth(app);