
import React from "react";
import { LikeHandler } from "../lib/Blog";
import Comment from "./Comment";
import LikeButton from "./LikeButton";

export default function ParticularBlog({ particularBlog, userId }) {


  function formatDate(date) {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(date));
  }

  const isLiked = particularBlog.likes.includes(userId.id);

  // const handleCommentSubmit = (e) => {
  //   e.preventDefault();
  //   // Add logic to submit the comment to the backend and update the state
  //   const updatedComments = [...comments, { text: newComment, author: userId.username, createdAt: new Date().toISOString() }];
  //   setComments(updatedComments);
  //   setNewComment("");
  // };

  return (
    <div className="bg-white text-PrimaryBlack min-h-screen p-8 font-WorkSans">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center mb-8">
          <div className="lg:w-3/5 mb-4 lg:mb-0">
            <h1 className="text-4xl font-bold text-PrimaryBlack mb-1">
              {particularBlog.title}
            </h1>
            <p className="text-gray-400 text-md font-medium mb-3">
              <time dateTime={particularBlog.createdAt}>
                {formatDate(particularBlog.createdAt)}
              </time>{" "}
              | by {particularBlog.author_id.username}
            </p>
            <h4 className="text-lg font-medium text-black/60 mb-3">
              {particularBlog.category}
            </h4>
            <p
              className="text-xl italic text-stone-900 mb-6 "
              style={{
                fontFamily: "serif",
              }}
            >
              "{particularBlog.quote}"
            </p>
          </div>
          <div className="lg:w-2/5 lg:flex lg:justify-end">
            <img
              src={particularBlog.image_url}
              alt={particularBlog.title}
              className="w-full lg:w-3/4 h-auto rounded-lg shadow-2xl"
            />
          </div>
        </div>
        <p className="text-lg text-black/70 mb-8">
          {particularBlog.description}
        </p>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
        
              <LikeButton blog={particularBlog} userId={userId} isLiked={isLiked}/>
          

            <button className="flex items-center hover:text-SecondaryPurple">
              <svg
                className="w-6 h-6 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M18 10c0 3.866-3.582 7-8 7a8.58 8.58 0 01-2.43-.357L4 17.667l.755-2.264A7.97 7.97 0 012 10c0-3.866 3.582-7 8-7s8 3.134 8 7z" />
              </svg>
              {particularBlog.comments.length} Comments
            </button>
          </div>
        </div>

        {/* Comment input field */}
        <Comment particularBlog={particularBlog} userId={userId}/>
      </div>
    </div>
  );
}
