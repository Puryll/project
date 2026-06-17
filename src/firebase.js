// Firebase initialization
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA46zRpWZbStcrcziyIjrYLRGu164RtosY",
  authDomain: "hek-driloni.firebaseapp.com",
  projectId: "hek-driloni",
  storageBucket: "hek-driloni.firebasestorage.app",
  messagingSenderId: "364716615709",
  appId: "1:364716615709:web:1d13af2d7b801fedb1bef4",
  measurementId: "G-YF6E63TSL1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics;
try {
  analytics = getAnalytics(app);
} catch (e) {
  // analytics may fail in non-browser environments
}

const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };
