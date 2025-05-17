import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faBell,
  faBug,
  faRedo,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const NotificationDrawer = ({ isOpen, onClose }) => {
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();

  const notifications = [
    {
      id: 3,
      title: "Test Route",
      message: "Clickig on this navigate to an unavailable route",
      time: "2 hours ago",
      read: false,
      navigateTo: "/unavailable-route",
    },
    {
      id: 4,
      title: "Test Error Boundary",
      message: "Click to test the error boundary functionality",
      time: "Just now",
      read: false,
      isTestError: true,
    },
  ];

  const handleNotificationClick = (notification) => {
    if (notification.isTestError) {
      setHasError(true);
      throw new Error(
        "Test Error: This is a simulated error to demonstrate the error boundary functionality."
      );
    }
    if (notification.navigateTo) {
      navigate(notification.navigateTo);
      return;
    }
  };

  const handleReset = () => {
    setHasError(false);
  };

  if (hasError) {
    return (
      <div className="fixed right-0 top-0 h-full w-80 bg-white dark:bg-[#1c1f26] shadow-lg z-50">
        <div className="p-6 h-full flex flex-col">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
              <FontAwesomeIcon
                icon={faExclamationTriangle}
                className="text-red-600 dark:text-red-400 text-2xl"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Simulated Error
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              This is a simulated error state. You can reset to continue
              testing.
            </p>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <button
              onClick={handleReset}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <FontAwesomeIcon icon={faRedo} className="text-sm" />
              <span>Reset Error State</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-80 bg-white dark:bg-[#1c1f26] shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-[#2d323b] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon
              icon={faBell}
              className="text-blue-600 dark:text-blue-400"
            />
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Notifications
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-[#2d323b] rounded-full transition-colors"
          >
            <FontAwesomeIcon
              icon={faTimes}
              className="text-gray-500 dark:text-gray-400"
            />
          </button>
        </div>

        {/* Notifications List */}
        <div className="overflow-y-auto h-[calc(100%-4rem)]">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                className={`p-4 border-b border-gray-200 dark:border-[#2d323b] hover:bg-gray-50 dark:hover:bg-[#2d323b] transition-colors cursor-pointer ${
                  !notification.read ? "bg-blue-50 dark:bg-blue-900/20" : ""
                } ${
                  notification.isTestError
                    ? "bg-yellow-50 dark:bg-yellow-900/20"
                    : ""
                }`}
              >
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center space-x-2">
                    {notification.isTestError && (
                      <FontAwesomeIcon
                        icon={faBug}
                        className="text-yellow-600 dark:text-yellow-400"
                      />
                    )}
                    <h3 className="font-medium text-gray-800 dark:text-gray-200">
                      {notification.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {notification.message}
                  </p>
                  <span className="text-xs text-gray-500 dark:text-gray-500">
                    {notification.time}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No notifications
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationDrawer;
