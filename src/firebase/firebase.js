// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJ5OBXUPkEkAIUCKkz1HFBBcSCcWcKaP0",
  authDomain: "papus-react.firebaseapp.com",
  projectId: "papus-react",
  storageBucket: "papus-react.firebasestorage.app",
  messagingSenderId: "54579242394",
  appId: "1:54579242394:web:5d515f2cfe4e890745c623"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);