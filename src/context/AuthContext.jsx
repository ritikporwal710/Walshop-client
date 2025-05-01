import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  const login = async (email, password) => {
    // This would be replaced with a real API call
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // if(token){
      //   setUser(token);
      //   return true;
      // }

      // Hardcoded user for demo
      if (email === "user@example.com" && password === "password") {
        setUser({
          id: "1",
          name: "Demo User",
          email: "user@example.com",
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const signup = async (name, email, password) => {
    // This would be replaced with a real API call
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For demo, always succeed
      setUser({
        id: Date.now().toString(),
        name,
        email,
      });
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    setUser,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    isSubscribed,
    setIsSubscribed,
    unreadNotifications,
    setUnreadNotifications,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
