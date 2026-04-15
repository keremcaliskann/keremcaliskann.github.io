import { database } from "/firebase-config.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-firestore.js";

async function projeleriGetir() {
  const querySnapshot = await getDocs(collection(database, "projects"));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
}