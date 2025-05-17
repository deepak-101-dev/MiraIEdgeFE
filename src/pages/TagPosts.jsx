import React from "react";
import { useParams } from "react-router-dom";
import { useDashboard } from "../context/DashboardContext";

const TagPosts = () => {
  const { tagName } = useParams();
  const { posts, loading, error } = useDashboard();

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="text-red-500 dark:text-red-400">Error: {error}</div>
      </div>
    );
  }

  // Filter posts that have the specified tag
  const taggedPosts = posts.filter((post) =>
    post.tags?.some(
      (tag) => tag.toLowerCase() === decodeURIComponent(tagName).toLowerCase()
    )
  );

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Posts tagged with #{decodeURIComponent(tagName)}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Found {taggedPosts.length} posts with this tag
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {taggedPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
          >
            {/* Image Container */}
            <div className="relative h-48 w-full">
              <img
                src={`https://picsum.photos/seed/${post.id}/800/400`}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              {/* Purple gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-purple-500/30 via-purple-500/10 to-black/50"></div>
              <div className="absolute bottom-0 left-0 p-4">
                <h2 className="text-xl font-semibold text-white mb-1 line-clamp-2 drop-shadow-lg">
                  {post.title}
                </h2>
              </div>
            </div>

            {/* Content Container */}
            <div className="p-6">
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                {post.body}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>Post ID: {post.id}</span>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <span>👍</span>
                    <span>{post.reactions?.likes || 0}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>👎</span>
                    <span>{post.reactions?.dislikes || 0}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>👤</span>
                    <span>{post.userId}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {taggedPosts.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            No posts found with the tag #{decodeURIComponent(tagName)}
          </p>
        </div>
      )}
    </div>
  );
};

export default TagPosts;
