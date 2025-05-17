import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useUsers } from "./UsersContext";
import { useDashboard } from "./DashboardContext";

const SearchContext = createContext();

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({
    users: [],
    posts: [],
    tags: [],
  });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { users = [] } = useUsers();
  const { posts = [] } = useDashboard();

  const performSearch = useCallback(
    (query) => {
      if (query.trim() === "") {
        setSearchResults({ users: [], posts: [], tags: [] });
        setShowSuggestions(false);
        return;
      }

      const searchTerm = query.toLowerCase();

      // Search in users
      const userResults = Array.isArray(users)
        ? users.filter((user) => {
            const fullName =
              `${user.name.first} ${user.name.last}`.toLowerCase();
            return fullName.includes(searchTerm);
          })
        : [];

      // Search in posts (title and tags)
      const postResults = Array.isArray(posts)
        ? posts.filter((post) => {
            const title = post.title.toLowerCase();
            const tags = post.tags || [];
            return (
              title.includes(searchTerm) ||
              tags.some((tag) => tag.toLowerCase().includes(searchTerm))
            );
          })
        : [];

      // Extract unique tags from matching posts
      const tagResults = Array.from(
        new Set(
          postResults
            .flatMap((post) => post.tags || [])
            .filter((tag) => tag.toLowerCase().includes(searchTerm))
        )
      );

      setSearchResults({
        users: userResults.slice(0, 3),
        posts: postResults.slice(0, 3),
        tags: tagResults.slice(0, 3),
      });
    },
    [users, posts]
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(searchQuery);
      if (searchQuery.trim() !== "") {
        setShowSuggestions(true);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [searchQuery, performSearch]);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setSearchResults({ users: [], posts: [], tags: [] });
    setShowSuggestions(false);
  }, []);

  const value = {
    searchQuery,
    setSearchQuery,
    searchResults,
    showSuggestions,
    setShowSuggestions,
    clearSearch,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
