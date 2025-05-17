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
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const preloadImages = async (posts) => {
    const imagePromises = posts.map((post) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = `https://picsum.photos/seed/${post.id}/800/400`;
        img.onload = () => resolve();
        img.onerror = () => reject();
      });
    });

    try {
      await Promise.all(imagePromises);
      setImagesLoaded(true);
    } catch (error) {
      console.error("Error preloading images:", error);
      // Even if some images fail to load, we'll still show the posts
      setImagesLoaded(true);
    }
  };

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://dummyjson.com/posts");
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await response.json();

      // Add image URLs to each post
      const postsWithImages = data.posts.map((post) => ({
        ...post,
        imageUrl: `https://picsum.photos/seed/${post.id}/800/400`,
      }));

      setPosts(postsWithImages);
      setLastFetchTime(Date.now());

      // Preload images
      await preloadImages(postsWithImages);
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
    loading: loading || !imagesLoaded, // Show loading until both data and images are ready
    error,
    refetch: fetchPosts,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};
