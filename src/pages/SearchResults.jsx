import React from "react";
import { useSearch } from "../context/SearchContext";
import { Link } from "react-router-dom";

const SearchResults = () => {
  const { searchResults, searchQuery } = useSearch();

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Search Results for "{searchQuery}"
        </h1>
      </div>

      {/* Users Results */}
      {searchResults.users.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Users
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.users.map((user) => (
              <Link
                key={user.login.uuid}
                to={`/users/${user.login.uuid}`}
                className="block"
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
                  <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-6">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img
                          src={user.picture.large}
                          alt={`${user.name.first} ${user.name.last}`}
                          className="w-20 h-20 rounded-full border-4 border-white dark:border-gray-800 shadow-lg"
                        />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-white">
                          {user.name.first} {user.name.last}
                        </h2>
                        <p className="text-white/80 text-sm">
                          {user.location.city}, {user.location.country}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Blogs Results */}
      {searchResults.blogs.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Blogs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.blogs.map((blog) => (
              <Link key={blog.id} to={`/blogs/${blog.id}`} className="block">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {blog.content.substring(0, 100)}...
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <span>By {blog.author}</span>
                      <span>{new Date(blog.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {searchResults.users.length === 0 && searchResults.blogs.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            No results found for "{searchQuery}"
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
