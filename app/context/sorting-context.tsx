"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "../types/user";
import { unorderedUsers } from "../lib/data";
import { useUserContext } from "./user-context";

type SortingContextProviderProps = {
  children: React.ReactNode;
};

type SortingContextType = {
  sortField: keyof User | null;
  setSortField: React.Dispatch<React.SetStateAction<keyof User | null>>;
  sortDirection: string | null;
  setSortDirection: React.Dispatch<React.SetStateAction<string | null>>;
  handleSort: (users: User[]) => void;
};

const SortingContext = createContext<SortingContextType | null>(null);

export const useSorting = (): SortingContextType => {
  const context = useContext(SortingContext);
  if (!context) {
    throw new Error("useSorting must be used within a SortingProvider");
  }
  return context;
};

const SortingContextProvider: React.FC<SortingContextProviderProps> = ({
  children,
}) => {
  const { updateUserList } = useUserContext();
  const [sortField, setSortField] = useState<keyof User | null>(null);
  const [sortDirection, setSortDirection] = useState<string | null>(null);

  const handleSort = (users: User[]) => {
    if (sortField !== null && sortDirection !== null) {
      const sortedUsers = [...users].sort((a, b) => {
        let valueA, valueB;

        if (sortField === "company") {
          valueA = a.company.name;
          valueB = b.company.name;
        } else if (sortField === "name") {
          valueA = a[sortField].includes("Mrs. ")
            ? a[sortField].replace("Mrs. ", "")
            : a[sortField];
          valueB = b[sortField].includes("Mrs. ")
            ? b[sortField].replace("Mrs. ", "")
            : b[sortField];
        } else {
          valueA = a[sortField];
          valueB = b[sortField];
        }

        if (typeof valueA === "string" && typeof valueB === "string") {
          return sortDirection === "ascending"
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        } else if (typeof valueA === "number" && typeof valueB === "number") {
          return sortDirection === "ascending"
            ? valueA - valueB
            : valueB - valueA;
        } else {
          return 0;
        }
      });

      updateUserList(sortedUsers);
    } else if (sortField !== null) {
      const sortedUsers = [...users].sort((a, b) => {
        let valueA, valueB;

        if (sortField === "company") {
          valueA = a.company.name;
          valueB = b.company.name;
        } else if (sortField === "name") {
          valueA = a[sortField].includes("Mrs. ")
            ? a[sortField].replace("Mrs. ", "")
            : a[sortField];
          valueB = b[sortField].includes("Mrs. ")
            ? b[sortField].replace("Mrs. ", "")
            : b[sortField];
        } else {
          valueA = a[sortField];
          valueB = b[sortField];
        }

        if (typeof valueA === "string" && typeof valueB === "string") {
          return valueA.localeCompare(valueB);
        } else if (typeof valueA === "number" && typeof valueB === "number") {
          return valueA - valueB;
        } else {
          return 0;
        }
      });

      updateUserList(sortedUsers);
    } else if (sortDirection !== null) {
      const sortedUsers = [...users].sort((a, b) => {
        const valueA = a.name.replace("Mrs. ", "");
        const valueB = b.name.replace("Mrs. ", "");

        if (typeof valueA === "string" && typeof valueB === "string") {
          return sortDirection === "ascending"
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        }

        return 0;
      });

      updateUserList(sortedUsers);
    }
  };

  useEffect(() => {
    handleSort(unorderedUsers);
  }, [sortField, sortDirection, unorderedUsers]);

  const value: SortingContextType = {
    sortField,
    setSortField,
    sortDirection,
    setSortDirection,
    handleSort,
  };

  return (
    <SortingContext.Provider value={value}>{children}</SortingContext.Provider>
  );
};

export default SortingContextProvider;
