import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCSHUKcpNWvgC6jibs8esbIwcOP9iGoBUA",
  authDomain: "netflix-eb418.firebaseapp.com",
  projectId: "netflix-eb418",
  storageBucket: "netflix-eb418.appspot.com",
  messagingSenderId: "619527221653",
  appId: "1:619527221653:web:88149258a3f45026edc69c"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { 
    auth,
    db
}