import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Reports from "./pages/Reports";
import SearchResults from "./pages/SearchResults";
import SearchResult from "./pages/SearchResult";
import UserProfile from "./pages/UserProfile";
import TagPosts from "./pages/TagPosts";
import Login from "./pages/Login";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";
import { DashboardProvider } from "./context/DashboardContext";
import { UsersProvider } from "./context/UsersContext";
import { SearchProvider } from "./context/SearchContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ErrorBoundary from "./components/ErrorBoundary";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <DashboardProvider>
          <UsersProvider>
            <SearchProvider>
              <Router>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <Layout />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<Dashboard />} />
                    <Route path="users" element={<Users />} />
                    <Route path="users/:userId" element={<UserProfile />} />
                    <Route path="reports" element={<Reports />} />
                    <Route path="account" element={<Account />} />
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
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
