// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-97a7d.firebaseapp.com",
  projectId: "mern-estate-97a7d",
  storageBucket: "mern-estate-97a7d.appspot.com",
  messagingSenderId: "775783037319",
  appId: "1:775783037319:web:2e41437ae909674c88fb22"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);