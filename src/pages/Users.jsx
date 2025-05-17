import React, { useState, useRef } from "react";
import { useUsers } from "../context/UsersContext";
import Pagination from "../components/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
const USERS_PER_PAGE = 9;

const Users = () => {
  const { users, loading, error } = useUsers();
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
          <div
            key={user.login.uuid}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
          >
            {/* User Header with Avatar */}
            <div className="relative bg-gradient-to-r from-[#2664eb] to-[#4F85F9] p-6">
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

            {/* User Info */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Email
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 font-medium truncate">
                    {user.email}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Phone
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 font-medium">
                    {user.phone}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Age
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 font-medium">
                    {user.dob.age} years
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Gender
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 font-medium capitalize">
                    {user.gender}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Address
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  {user.location.street.number} {user.location.street.name}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  {user.location.city}, {user.location.state}{" "}
                  {user.location.postcode}
                </p>
              </div>
            </div>
          </div>
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
