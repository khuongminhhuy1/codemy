import React, { createContext, useEffect, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  // Use state to manage the user data
  const [user, setUser] = useState(null);

  // Effect to run when the component mounts
  useEffect(() => {
    // Check if user data is in local storage
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      // If user data is found, parse and set it in the state
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Effect to run whenever the user data changes
  useEffect(() => {
    // Store user data in local storage
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  // Value to be provided by the context provider
  const contextValue = {
    user,
    setUser,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export { UserProvider, UserContext };
