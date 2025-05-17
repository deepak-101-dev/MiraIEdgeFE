import React from "react";
import { useParams } from "react-router-dom";
import { useUsers } from "../context/UsersContext";
import { useDashboard } from "../context/DashboardContext";

const SearchResult = () => {
  const { type, id } = useParams();
  const { users } = useUsers();
  const { posts } = useDashboard();

  // Find the user if the result is a user
  const user = type === "user" ? users.find((u) => u.login.uuid === id) : null;
  // Find the post if the result is a post
  const post =
    type === "post" ? posts.find((p) => p.id === parseInt(id)) : null;

  if (type === "user" && user) {
    return (
      <div className="bg-white dark:bg-[#1c1f26] rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-4">
          <img
            src={user.picture.large}
            alt={`${user.name.first} ${user.name.last}`}
            className="w-24 h-24 rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              {user.name.first} {user.name.last}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
            <p className="text-gray-600 dark:text-gray-300">
              {user.location.city}, {user.location.country}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (type === "post" && post) {
    return (
      <div className="space-y-6">
        <div className="bg-white dark:bg-[#1c1f26] rounded-lg shadow-md overflow-hidden">
          {/* Post Image */}
          <div className="relative h-64 w-full">
            <img
              src={`https://picsum.photos/seed/${post.id}/1200/600`}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            {/* Purple gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#5fa5fa]/60 via-[#5fa5fa]/10 to-black/90"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                {post.title}
              </h1>
              <div className="flex items-center space-x-4 text-white/90">
                <span>Post ID: {post.id}</span>
              </div>
            </div>
          </div>

          {/* Post Content */}
          <div className="p-6">
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
              {post.body}
            </p>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-[#5fa5fa] dark:bg-[#5fa5fa]/30 text-black-600 dark:text-gray-300 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Reactions */}
            <div className="flex items-center space-x-6 text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <span className="text-xl">👍</span>
                <span>{post.reactions?.likes || 0}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xl">👎</span>
                <span>{post.reactions?.dislikes || 0}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xl">💬</span>
                <span>{post.reactions?.comments || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#1c1f26] rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        Result Not Found
      </h1>
    </div>
  );
};

export default SearchResult;
