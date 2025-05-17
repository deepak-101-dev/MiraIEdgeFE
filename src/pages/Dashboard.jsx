import React, { useState } from "react";
import { useDashboard } from "../context/DashboardContext";
import Pagination from "../components/Pagination";

const POSTS_PER_PAGE = 9;

const Dashboard = () => {
  const { posts, loading, error } = useDashboard();
  console.log(posts);
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="text-red-500 dark:text-red-400">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Welcome to your dashboard. Here you'll find an overview of your
          system.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
          >
            {/* Image Container */}
            <div className="relative h-48 w-full">
              <img
                src={`https://picsum.photos/seed/${post.id}/800/400`}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              {/* Purple gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-purple-500/30 via-purple-500/10 to-black/50"></div>
              <div className="absolute bottom-0 left-0 p-4">
                <h2 className="text-xl font-semibold text-white mb-1 line-clamp-2 drop-shadow-lg">
                  {post.title}
                </h2>
              </div>
            </div>

            {/* Content Container */}
            <div className="p-6">
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                {post.body}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>Post ID: {post.id}</span>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <span>👍</span>
                    <span>{post.reactions?.likes || 0}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>👎</span>
                    <span>{post.reactions?.dislikes || 0}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>👤</span>
                    <span>{post.userId}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Dashboard;
