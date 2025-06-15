import React, { createContext, useContext, useState, useEffect } from "react";

interface UserContextType {
  displayName: string | null;
  setDisplayName: (name: string | null) => void;
  clearUser: () => void;
}

const UserContext = createContext<UserContextType>({
  displayName: null,
  setDisplayName: () => {},
  clearUser: () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [displayName, setDisplayName] = useState<string | null>(null);

  useEffect(() => {
    const storedName = localStorage.getItem("displayName");
    if (storedName) {
      setDisplayName(storedName);
    }
  }, []);
    const clearUser = () => {
    setDisplayName(null);
    localStorage.removeItem("displayName");
    localStorage.removeItem("email");
    };
  return (
    <UserContext.Provider value={{ displayName, setDisplayName, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

