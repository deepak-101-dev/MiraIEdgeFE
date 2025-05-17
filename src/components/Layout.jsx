// src/components/Layout.jsx

import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div className="h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      {/* Fixed Header */}
      <Header />

      {/* Main Content Area with Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Fixed Sidebar */}
        <Sidebar />

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
