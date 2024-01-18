"use client"

import React, { createContext, useContext, useState } from "react";
import { User } from "../types/user";
import { unorderedUsers } from "../lib/data";

type UserContextProviderProps = {
  children: React.ReactNode;
};

type UserContextType = {
    users: User[];
    updateUserList: React.Dispatch<React.SetStateAction<User[]>>;
};

const UserContext = createContext<UserContextType | null>(null);

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

const UserContextProvider: React.FC<UserContextProviderProps> = ({
  children,
}) => {
  const [users, setUsers] = useState<User[]>(unorderedUsers);
  const updateUserList: React.Dispatch<React.SetStateAction<User[]>> = (newUsers) => {
    setUsers(newUsers);
  };
  
  return (
    <UserContext.Provider value={{ users, updateUserList }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
