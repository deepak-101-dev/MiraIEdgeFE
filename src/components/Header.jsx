// src/components/Header.jsx

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faChartBar,
  faUser,
  faSearch,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has a theme preference in localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

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

  return (
    <header className="bg-white dark:bg-[#0e1217] shadow p-4 transition-colors duration-200 border-b border-white dark:border-[#2d323b]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          AdminDash
        </div>

        {/* Search Bar */}
        <SearchBar
          showMobileSearch={showMobileSearch}
          setShowMobileSearch={setShowMobileSearch}
        />

        {/* Icons Group - Modified for mobile */}
        <div className="flex items-center space-x-4 md:space-x-6">
          {/* Mobile Search Icon */}
          <button
            onClick={() => setShowMobileSearch(true)}
            className="md:hidden p-2 hover:bg-gray-100/50 dark:hover:bg-[#0e1217]/50 rounded-full transition-all duration-300 hover:scale-110"
          >
            <FontAwesomeIcon
              icon={faSearch}
              className="text-gray-600 dark:text-gray-300 text-xl"
            />
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-gray-100/50 dark:hover:bg-[#0e1217]/50 rounded-full transition-all duration-300 hover:scale-110 group"
            aria-label="Toggle theme"
          >
            <FontAwesomeIcon
              icon={isDarkMode ? faSun : faMoon}
              className="text-gray-600 dark:text-gray-300 text-xl group-hover:rotate-[-45deg] transition-transform duration-300"
            />
          </button>
          {/* Notification icon - visible on all screens */}
          <button className="p-2 hover:bg-gray-100/50 dark:hover:bg-[#0e1217]/50 rounded-full transition-all duration-300 hover:scale-110">
            <FontAwesomeIcon
              icon={faBell}
              className="text-gray-600 dark:text-gray-300 text-xl"
            />
          </button>
          {/* Hide these buttons on mobile as they're in the bottom nav */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => navigate("/reports")}
              className="p-2 hover:bg-gray-100/50 dark:hover:bg-[#0e1217]/50 rounded-full transition-all duration-300 hover:scale-110"
            >
              <FontAwesomeIcon
                icon={faChartBar}
                className="text-gray-600 dark:text-gray-300 text-xl"
              />
            </button>
            <button className="p-2 hover:bg-gray-100/50 dark:hover:bg-[#0e1217]/50 rounded-full transition-all duration-300 hover:scale-110">
              <FontAwesomeIcon
                icon={faUser}
                className="text-gray-600 dark:text-gray-300 text-xl"
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
