import React from "react";

const PostCard = ({ post }) => {
  return (
    <div className="bg-white dark:bg-[#1c1f26] rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      {/* Image Container */}
      <div className="relative h-48 w-full">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        {/* Blue gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#5fa5fa]/60 via-[#5fa5fa]/10 to-black/90"></div>
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
  );
};

export default PostCard;
