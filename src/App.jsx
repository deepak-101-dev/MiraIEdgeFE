import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Reports from "./pages/Reports";
import SearchResults from "./pages/SearchResults";
import SearchResult from "./pages/SearchResult";
import UserProfile from "./pages/UserProfile";
import TagPosts from "./pages/TagPosts";
import { DashboardProvider } from "./context/DashboardContext";
import { UsersProvider } from "./context/UsersContext";
import { SearchProvider } from "./context/SearchContext";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <DashboardProvider>
      <UsersProvider>
        <SearchProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="users" element={<Users />} />
                <Route path="users/:userId" element={<UserProfile />} />
                <Route path="reports" element={<Reports />} />
                <Route path="search/:query" element={<SearchResults />} />
                <Route
                  path="search/result/:type/:id"
                  element={<SearchResult />}
                />
                <Route path="tags/:tagName" element={<TagPosts />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Router>
        </SearchProvider>
      </UsersProvider>
    </DashboardProvider>
  );
}

export default App;
