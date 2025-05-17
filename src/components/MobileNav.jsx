import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRss,
  faUsers,
  faChartBar,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const MobileNav = () => {
  const menuItems = [
    { icon: faRss, label: "Dashboard", path: "/" },
    { icon: faUsers, label: "Users", path: "/users" },
    { icon: faChartBar, label: "Reports", path: "/reports" },
    { icon: faUser, label: "Account", path: "/account" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="flex justify-around items-center h-16">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) => `
              flex flex-col items-center justify-center w-full h-full
              ${
                isActive
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-400"
              }
            `}
          >
            <FontAwesomeIcon icon={item.icon} className="text-xl" />
            <span className="text-xs mt-1">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default MobileNav;
