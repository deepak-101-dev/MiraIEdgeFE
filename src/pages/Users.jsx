import React, { useState, useRef } from "react";
import { useUsers } from "../context/UsersContext";
import Pagination from "../components/Pagination";
import UserCard from "../components/UserCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const USERS_PER_PAGE = 9;

const Users = () => {
  const { users, loading, error } = useUsers();
  console.log(users);

  const [currentPage, setCurrentPage] = useState(1);
  const mainContainerRef = useRef(null);

  // Calculate pagination
  const totalPages = Math.ceil(users.length / USERS_PER_PAGE);
  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const endIndex = startIndex + USERS_PER_PAGE;
  const currentUsers = users.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    mainContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
    <div className="space-y-6" ref={mainContainerRef}>
      <div className="bg-white dark:bg-[#0e1217] rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-3">
          <FontAwesomeIcon
            icon={faUser}
            className="text-blue-600 dark:text-blue-400 text-2xl"
          />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Users
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentUsers.map((user) => (
          <UserCard key={user.login.uuid} user={user} />
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

export default Users;
