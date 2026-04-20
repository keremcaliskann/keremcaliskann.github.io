import { auth } from "/src/firebase-config.js";
import { signInWithEmailAndPassword } from "firebase/auth";

async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Giriş başarılı:", userCredential.user.uid);
    // UID'ni buradan kopyalayıp kurallara yapıştırabilirsin.
    window.location.href = '/Admin'; 
  } catch (error) {
    console.error("Giriş hatası:", error.message);
  }
}

document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  login(email, password);
});