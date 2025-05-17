// src/components/Header.jsx

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faChartBar,
  faUser,
  faSearch,
  faSun,
  faMoon,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import { useSearch } from "../context/SearchContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    showSuggestions,
    setShowSuggestions,
    clearSearch,
  } = useSearch();
  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    // Check if user has a theme preference in localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    // Close suggestions when clicking outside
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowSuggestions]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSuggestionClick = (type, item) => {
    setShowSuggestions(false);
    if (type === "user") {
      navigate(`/users/${item.login.uuid}`);
    } else if (type === "post") {
      navigate(`/posts/${item.id}`);
    } else if (type === "tag") {
      navigate(`/tags/${encodeURIComponent(item)}`);
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow p-4 transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          AdminDash
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl mx-8" ref={searchRef}>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search users and blogs..."
              className="w-full px-4 py-2 pl-10 pr-10 rounded-lg border border-gray-300 dark:border-gray-600 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            )}
          </div>

          {/* Search Suggestions */}
          {showSuggestions &&
            (searchResults.users.length > 0 ||
              searchResults.posts.length > 0 ||
              searchResults.tags.length > 0) && (
              <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                {/* Posts Section */}
                {searchResults.posts.length > 0 && (
                  <div className="p-2">
                    <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 px-2 py-1">
                      {searchQuery} in posts
                    </div>
                    {searchResults.posts.map((post) => (
                      <button
                        key={post.id}
                        onClick={() => handleSuggestionClick("post", post)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                      >
                        <div className="text-gray-800 dark:text-white font-medium">
                          {post.title}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {post.tags?.join(", ")}
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Users Section */}
                {searchResults.users.length > 0 && (
                  <div className="p-2 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 px-2 py-1">
                      {searchQuery} in users
                    </div>
                    {searchResults.users.map((user) => (
                      <button
                        key={user.login.uuid}
                        onClick={() => handleSuggestionClick("user", user)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md flex items-center space-x-3"
                      >
                        <img
                          src={user.picture.thumbnail}
                          alt={user.name.first}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <div className="text-gray-800 dark:text-white">
                            {user.name.first} {user.name.last}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {user.email}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Tags Section */}
                {searchResults.tags.length > 0 && (
                  <div className="p-2 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 px-2 py-1">
                      {searchQuery} in tags
                    </div>
                    {searchResults.tags.map((tag, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick("tag", tag)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                      >
                        <div className="text-gray-800 dark:text-white font-medium">
                          #{tag}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
        </div>

        {/* Icons Group */}
        <div className="flex items-center space-x-6">
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            aria-label="Toggle theme"
          >
            <FontAwesomeIcon
              icon={isDarkMode ? faSun : faMoon}
              className="text-gray-600 dark:text-gray-300 text-xl"
            />
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
            <FontAwesomeIcon
              icon={faBell}
              className="text-gray-600 dark:text-gray-300 text-xl"
            />
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
            <FontAwesomeIcon
              icon={faChartBar}
              className="text-gray-600 dark:text-gray-300 text-xl"
            />
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
            <FontAwesomeIcon
              icon={faUser}
              className="text-gray-600 dark:text-gray-300 text-xl"
            />
          </button>
        </div>
      </div>
    </header>
  );
}
