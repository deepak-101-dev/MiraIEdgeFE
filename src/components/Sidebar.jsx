import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faRss,
  faUsers,
  faChartBar,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const menuItems = [
    { icon: faRss, label: "Dashboard", path: "/" },
    { icon: faUsers, label: "Users", path: "/users" },
    { icon: faChartBar, label: "Reports", path: "/reports" },
  ];

  return (
    <div
      className={`bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ease-in-out h-full
        ${isCollapsed ? "w-20" : "w-64"}`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        {!isCollapsed && (
          <span className="text-lg font-semibold text-gray-800 dark:text-white">
            Menu
          </span>
        )}
        <button
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <FontAwesomeIcon
            icon={faBars}
            className="text-gray-600 dark:text-gray-300"
          />
        </button>
      </div>

      <div className="p-4 space-y-2">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) => `
              flex items-center p-3 rounded-lg cursor-pointer transition-colors
              ${
                isActive
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }
            `}
          >
            <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />
            {!isCollapsed && (
              <span className="ml-3 font-medium">{item.label}</span>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
