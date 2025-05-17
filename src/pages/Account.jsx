import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faUser,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

const Account = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className=" mx-auto">
      <div className="bg-white dark:bg-[#1c1f26] rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Account Settings
        </h1>

        <div className="space-y-6">
          {/* User Info Section */}
          <div className="bg-gray-50 dark:bg-[#0e1217] rounded-lg p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-blue-600 dark:text-blue-400 text-xl"
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Profile Information
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Manage your account settings
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-gray-400 dark:text-gray-500"
                />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Email Address
                  </p>
                  <p className="text-gray-800 dark:text-white">{user?.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Logout Section */}
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-red-800 dark:text-red-400 mb-4">
              Danger Zone
            </h2>
            <p className="text-red-600 dark:text-red-400 mb-4">
              Once you log out, you'll need to sign in again to access the admin
              panel.
            </p>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
