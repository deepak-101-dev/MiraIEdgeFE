import React, { useState, useRef } from "react";
import { useDashboard } from "../context/DashboardContext";
import Pagination from "../components/Pagination";
import PostCard from "../components/PostCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

const POSTS_PER_PAGE = 6;

const Dashboard = () => {
  const { posts, loading, error } = useDashboard();
  const [currentPage, setCurrentPage] = useState(1);
  const mainContainerRef = useRef(null);

  // Calculate pagination
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    mainContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        Error loading posts: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6" ref={mainContainerRef}>
      <div className="bg-white dark:bg-[#0e1217] rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-3">
          <FontAwesomeIcon
            icon={faHouse}
            className="text-blue-600 dark:text-blue-400 text-2xl"
          />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Dashboard
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Dashboard;
