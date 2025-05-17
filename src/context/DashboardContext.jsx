import React, { createContext, useContext, useState, useEffect } from "react";

const DashboardContext = createContext();

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};

export const DashboardProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastFetchTime, setLastFetchTime] = useState(null);

  const fetchPosts = async () => {
    try {
      const response = await fetch("https://dummyjson.com/posts");
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await response.json();
      setPosts(data.posts);
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
      fetchPosts();
    } else {
      setLoading(false);
    }
  }, []);

  const value = {
    posts,
    loading,
    error,
    refetch: fetchPosts,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};
