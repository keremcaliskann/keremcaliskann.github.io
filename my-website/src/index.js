import { database } from "/src/firebase-config.js";
import { collection, getDocs } from "firebase/firestore";

async function getTest() {
  const querySnapshot = await getDocs(collection(database, "products"));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
}

getTest();