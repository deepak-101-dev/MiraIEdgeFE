import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import loginCover from "../assets/loginCover.jpg";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login();
      // Redirect to home page after successful login
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage: `url(${loginCover})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-md w-full bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-lg p-8 text-center backdrop-blur-md">
        <div
          className="text-2xl font-extrabold bg-gradient-to-r from-[#37BEF0] via-[#2D6AF8] via-[#8B04DD] to-[#D040DE] bg-clip-text text-transparent cursor-pointer mb-6 select-none"
          onClick={() => navigate("/")}
        >
          MiraiEdge
        </div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
          Admin Panel Access
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Please login to access the admin panel. This area is restricted to
          authorized personnel only.
        </p>

        <button
          onClick={handleLogin}
          className="w-full inline-flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
