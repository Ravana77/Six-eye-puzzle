// Import the functions you need from the Firebase SDK
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set } from "firebase/database";
import { get, child } from "firebase/database";
import { useContext } from "react";

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
// Creates a reference to overall database
const dbRef = ref(database);

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

// function to check name & password from getAllUsers, and return true or false
async function checkUser(name, password, login, logout, type) {
  if (!name || !password) {
    console.error("Invalid parameters for checkUser function");
    return false; // Invalid parameters
  }
  const users = await getAllUsers(); // Fetch all users from the database
  console.log(users); // Log the users for debugging
  for (const userId in users) {
    const user = users[userId];
    if (user.name === name && user.password === password) {
      if (type !== "test") {
        logout(); // Call the logout function to clear session storage first.
        login(user); // Call the login function with user details
        console.log("User log stored in session storage:", user.name, user.email, user.password);
      }
      return true; // User found with matching username and password
    }
  }
  return false; // No matching user found
}

// Function to add a new user to the database
async function addUser(name, email, password, login, logout) {
  if (!name || !email || !password) {
    console.error("Invalid parameters for addUser function");
    return false; // Invalid parameters
  }
  try {
    // call dbRef to get the usersRef which is already called in firebase.jsx
    const dbRef = ref(database);
    const newUserRef = push(usersRef); // Create a new child reference under "users"
    const userData = {
      name: name,
      email: email,
      password: password,
      timeattack: 0,
      survival: 0,
      scramble: 0,
      memory: 0
    };
    await set(newUserRef, userData); // Set the new user's data in the database
    console.log("User added successfully:", name, email, password);
    logout(); // Call the logout function to clear session storage first.
    login(userData); // Call the login function with user details
    console.log("User Data Stored in Session Storage:", name, email, password);

    return true;
  } catch (error) {
    console.error("Error adding user:", error);
    return false;
  }
}

// Function to update the score for a specific game mode
async function updateScore(email, game, score) {
  if (!email || !game || score === undefined) {
    console.error("Invalid parameters for setScore function");
    return false; // Invalid parameters
  }

  const users = await getAllUsers(); // Fetch all users from the database
  console.log(users); // Log the users for debugging

  for (const userId in users) {
    const user = users[userId];
    if (user.email === email) {
      // Check if the new score is higher than the previous score
      const previousScore = user[game] || 0; // Get the previous score or default to 0
      if (score > previousScore) {
        // Update the user's score for the specified game
        await set(ref(database, `users/${userId}/${game}`), score);
        console.log(`Score updated for ${email} in ${game}: ${score}`);
        return true; // Score updated successfully
      } else {
        console.log(`New score (${score}) is not higher than the previous score (${previousScore})`);
        return false; // No update needed
      }
    }
  }
  console.log(`User with email ${email} not found`);
  return false; // User not found
}

// a function that scans all users and returns, a list of top 10 users, sorted by score, params of game type.
async function fetchLeaderboard(game) {
  // frst convert the Strnig game type to database suitable types
  if (game === "Time Attack") {
    game = "timeattack";
  } else if (game === "Scramble") {
    game = "scramble";
  } else if (game === "Survival") {
    game = "survival";
  } else if (game === "Memory") {
    game = "memory";
  } else {
    console.error("Invalid game type:", game);
    return []; // Invalid game type
  }
  const users = await getAllUsers(); // Fetch all users from the database
  console.log(users); // Log the users for debugging

  // Create an array of users with their scores
  const userScores = Object.entries(users).map(([userId, user]) => ({
    name: user.name,
    email: user.email,
    score: user[game] || 0, // Get the score for the specified game or default to 0
  }));

  // Sort the users by score in descending order and take the top 10
  const topUsers = userScores.sort((a, b) => b.score - a.score).slice(0, 10);
  return topUsers; // Return the top 10 users
}

async function fetchProfile(email) {
  const users = await getAllUsers(); // Fetch all users from the database
  console.log(users); // Log the users for debugging

  for (const userId in users) {
    const user = users[userId];
    if (user.email === email) {
      return user; // Return the user profile if found
    }
  }
  return null; // User not found
}

export { app, database, getAllUsers, checkUser, addUser, updateScore, fetchLeaderboard };

