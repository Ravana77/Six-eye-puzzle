// Import the functions you need from the Firebase SDK
import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
import { get, child } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4WGV-Fkl15gaZrInVSoPcDlotMs72Wl8",
  authDomain: "six-eye-puzzle.firebaseapp.com",
  projectId: "six-eye-puzzle",
  storageBucket: "six-eye-puzzle.firebasestorage.app",
  messagingSenderId: "39387653159",
  appId: "1:39387653159:web:7ad7ad78204f12c389da02",
  measurementId: "G-F77DW3PY2M",
  databaseURL: "https://six-eye-puzzle-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Create a reference to the "users" path in the Realtime Database
const usersRef = ref(database, 'users');

async function getAllUsers() {
  const dbRef = ref(database);
  try {
    const snapshot = await get(child(dbRef, 'users'));
    if (snapshot.exists()) {
      return snapshot.val(); // Returns all users as a dictionary
    } else {
      console.log("No data available");
      return {};
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    return {};
  }
}

// function to check username & password from getAllUsers, and return true or false
async function checkUser(username, password) {
  const users = await getAllUsers(); // Fetch all users from the database
  for (const userId in users) {
    const user = users[userId];
    if (user.username === username && user.password === password) {
      return true; // User found with matching username and password
    }
  }
  return false; // No matching user found
}

export { app, database, getAllUsers };