import React, { createContext, useState, useContext } from "react";

// Create the Session Context
const SessionContext = createContext();

// Custom hook to use the Session Context
export const useSession = () => useContext(SessionContext);

// Session Provider Component
export const SessionProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Load user from localStorage if available
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Function to log in a user
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Save user to localStorage
  };

  // Function to log out a user
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Remove user from localStorage
  };

  // Function to update a score for a specific game type
  const updateSessionScore = (type, score) => {
    if (!user) {
      console.error("No user is logged in. Cannot update score.");
      return;
    }

    // Update the user's score for the specified game type
    const updatedUser = {
      ...user,
      [type]: score, // Update the score for the given type
    };

    setUser(updatedUser); // Update the user state
    localStorage.setItem("user", JSON.stringify(updatedUser)); // Persist the updated user to localStorage
    console.log(`Updated ${type} score to ${score} for user:`, updatedUser);
  };

  return (
    <SessionContext.Provider value={{ user, login, logout, updateSessionScore }}>
      {children}
    </SessionContext.Provider>
  );
};