import React, { createContext, useContext, useState, useEffect } from "react";

const UsersContext = createContext();

export const useUsers = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
};

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastFetchTime, setLastFetchTime] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch("https://randomuser.me/api/?results=30");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data.results);
      setLastFetchTime(Date.now());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const shouldRefetch = () => {
    if (!lastFetchTime) return true;
    const thirtyMinutes = 30 * 60 * 1000; // 30 minutes in milliseconds
    return Date.now() - lastFetchTime > thirtyMinutes;
  };

  useEffect(() => {
    if (shouldRefetch()) {
      fetchUsers();
    } else {
      setLoading(false);
    }
  }, []);

  const value = {
    users,
    loading,
    error,
    refetch: fetchUsers,
  };

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};
