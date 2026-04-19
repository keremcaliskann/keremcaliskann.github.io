import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.x/firebase-auth.js";
import { auth } from "./firebase-config.js";

async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Giriş başarılı:", userCredential.user.uid);
    // UID'ni buradan kopyalayıp kurallara yapıştırabilirsin.
  } catch (error) {
    console.error("Giriş hatası:", error.message);
  }
}