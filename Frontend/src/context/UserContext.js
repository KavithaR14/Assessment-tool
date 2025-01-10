import React, { createContext, useContext, useState } from 'react';

// Create the context
const UserContext = createContext();

// Provider component
export const UserProvider = ({ children }) => {
  const [isSignedUp, setIsSignedUp] = useState(false); // Default state

  return (
    <UserContext.Provider value={{ isSignedUp, setIsSignedUp }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
