import React from "react";
import { useParams } from "react-router-dom";
import { useUsers } from "../context/UsersContext";

const UserProfile = () => {
  const { userId } = useParams();
  const { users } = useUsers();
  console.log(users);
  const user = users.find((u) => u.login.uuid === userId);

  if (!user) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="text-red-500 dark:text-red-400">User not found</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          User Profile
        </h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        {/* Profile Header */}
        <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
          <div className="absolute -bottom-16 left-8">
            <img
              src={user.picture.large}
              alt={`${user.name.first} ${user.name.last}`}
              className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-lg"
            />
          </div>
        </div>

        {/* Profile Content */}
        <div className="pt-20 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              {user.name.first} {user.name.last}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {user.location.city}, {user.location.country}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Personal Information
              </h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <span className="text-gray-500 dark:text-gray-400">📧</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {user.email}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-500 dark:text-gray-400">📱</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {user.phone}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-500 dark:text-gray-400">👤</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {user.dob.age} years old
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-500 dark:text-gray-400">⚧</span>
                  <span className="text-gray-700 dark:text-gray-300 capitalize">
                    {user.gender}
                  </span>
                </div>
              </div>
            </div>

            {/* Location Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Location
              </h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <span className="text-gray-500 dark:text-gray-400">🏠</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {user.location.street.number} {user.location.street.name}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-500 dark:text-gray-400">🌆</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {user.location.city}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-500 dark:text-gray-400">🏳️</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {user.location.state}, {user.location.country}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-500 dark:text-gray-400">📮</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {user.location.postcode}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
