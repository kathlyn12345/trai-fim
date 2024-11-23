// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAaERJjbRBDJA1CFUZadEAjYrFPpBTGTu8",
  authDomain: "deads-bf1ee.firebaseapp.com",
  projectId: "deads-bf1ee",
  storageBucket: "deads-bf1ee.firebasestorage.app",
  messagingSenderId: "118258335822",
  appId: "1:118258335822:web:3cfea3588330aa1483431f",
  measurementId: "G-6T1WVP02R9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };