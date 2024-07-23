"use client";
import { useState } from "react";
import { LikeHandler } from "../lib/Blog";
export default function LikeButton({ blog, isLiked, userId }) {
  const [abc, setAbc] = useState(isLiked);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setAbc(!isLiked);
        LikeHandler(blog._id, userId);
      }}
    >
      <button
        type="submit"
        className={`flex items-center transition-colors duration-150 ${
          abc ? "text-SecondaryPink" : "hover:text-SecondaryPink"
        }`}
      >
        <svg className="w-6 h-6 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3.172 3.172a4 4 0 015.656 0L10 4.343l1.172-1.171a4 4 0 115.656 5.656L10 16.344l-6.828-6.828a4 4 0 010-5.656z" />
        </svg>
        {blog.likes.length} Likes
      </button>
    </form>
  );
}
