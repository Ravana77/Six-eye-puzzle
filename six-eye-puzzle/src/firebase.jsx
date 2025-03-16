// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4WGV-Fkl15gaZrInVSoPcDlotMs72Wl8",
  authDomain: "six-eye-puzzle.firebaseapp.com",
  projectId: "six-eye-puzzle",
  storageBucket: "six-eye-puzzle.firebasestorage.app",
  messagingSenderId: "39387653159",
  appId: "1:39387653159:web:7ad7ad78204f12c389da02",
  measurementId: "G-F77DW3PY2M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);