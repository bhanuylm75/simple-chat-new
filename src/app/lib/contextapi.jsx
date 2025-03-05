"use client"; // ✅ This ensures it's a client component

import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  // Function to handle login and store token in state
  const login = (newToken) => {
    setToken(newToken);
  };

  // Function to logout user (we will handle router in a component instead)
  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
