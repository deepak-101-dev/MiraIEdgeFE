// src/components/Layout.jsx

import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";

const Layout = () => {
  return (
    <div className="h-screen flex flex-col bg-gray-100 dark:bg-[#0e1217]">
      {/* Fixed Header */}
      <Header />

      {/* Main Content Area with Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar - Hidden on mobile */}
        <div className="hidden lg:block h-full">
          <Sidebar />
        </div>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-6 pb-20 lg:pb-6">
          <Outlet />
        </main>
      </div>

      {/* Mobile Navigation - Visible only on mobile/tablet */}
      <div className="lg:hidden">
        <MobileNav />
      </div>
    </div>
  );
};

export default Layout;
