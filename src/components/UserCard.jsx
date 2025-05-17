import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const UserCard = ({ user }) => {
  return (
    <div className="bg-white dark:bg-[#1C1F26] rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
      {/* User Header with Avatar */}
      <div className="relative bg-gradient-to-r from-[#2664eb] to-[#4F85F9] p-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={user.picture.thumbnail}
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
            <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
            <p className="text-gray-700 dark:text-gray-300 font-medium truncate">
              {user.email}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
            <p className="text-gray-700 dark:text-gray-300 font-medium">
              {user.phone}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500 dark:text-gray-400">Age</p>
            <p className="text-gray-700 dark:text-gray-300 font-medium">
              {user.dob.age} years
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500 dark:text-gray-400">Gender</p>
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
            {user.location.city}, {user.location.state} {user.location.postcode}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
