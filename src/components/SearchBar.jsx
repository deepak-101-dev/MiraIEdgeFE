import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useSearch } from "../context/SearchContext";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ showMobileSearch, setShowMobileSearch }) => {
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

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSuggestionClick = (type, item) => {
    setShowSuggestions(false);
    setShowMobileSearch(false);
    if (type === "user") {
      navigate(`/search/result/user/${item.login.uuid}`);
    } else if (type === "post") {
      navigate(`/search/result/post/${item.id}`);
    } else if (type === "tag") {
      navigate(`/tags/${encodeURIComponent(item)}`);
    }
  };

  return (
    <div
      className={`${
        showMobileSearch
          ? "fixed inset-0 bg-white dark:bg-[#1c1f26] p-4 z-50"
          : "hidden md:flex"
      } flex-1 max-w-2xl mx-8`}
      ref={searchRef}
    >
      <div className="relative w-full">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search users and blogs..."
          className="w-full px-4 py-2 pl-10 pr-10 rounded-lg border border-gray-300 dark:border-gray-600 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            dark:bg-[#1c1f26] dark:text-white dark:placeholder-gray-400"
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
        {showMobileSearch && (
          <button
            onClick={() => setShowMobileSearch(false)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        )}

        {/* Search Suggestions */}
        {showSuggestions &&
          (searchResults.users.length > 0 ||
            searchResults.posts.length > 0 ||
            searchResults.tags.length > 0) && (
            <div className="absolute z-50 w-full mt-2 bg-white dark:bg-[#1c1f26] rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-h-[60vh] overflow-y-auto">
              {/* Posts Section */}
              {searchResults.posts.length > 0 && (
                <div className="p-2">
                  <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 px-2 py-1">
                    <span className="text-blue-600 dark:text-blue-400">
                      {searchQuery}
                    </span>{" "}
                    in posts
                  </div>
                  {searchResults.posts.map((post) => (
                    <button
                      key={post.id}
                      onClick={() => handleSuggestionClick("post", post)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#0e1217] rounded-md"
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
                    <span className="text-blue-600 dark:text-blue-400">
                      {searchQuery}
                    </span>{" "}
                    in users
                  </div>
                  {searchResults.users.map((user) => (
                    <button
                      key={user.login.uuid}
                      onClick={() => handleSuggestionClick("user", user)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#0e1217] rounded-md flex items-center space-x-3"
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
                    <span className="text-blue-600 dark:text-blue-400">
                      {searchQuery}
                    </span>{" "}
                    in tags
                  </div>
                  {searchResults.tags.map((tag, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick("tag", tag)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#0e1217] rounded-md"
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
    </div>
  );
};

export default SearchBar;
