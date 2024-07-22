'use client'
import React from 'react';

export default function ParticularBlog({ particularBlog }) {
  function formatDate(date) {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(date));
  }

  // function LikeHandler(){
  //   return particularBlog.likes=+ 1;
  // }   
  return (
    <div className="bg-white text-PrimaryBlack min-h-screen p-8 font-WorkSans">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center mb-8">
          <div className="lg:w-3/5 mb-4 lg:mb-0">
            <h1 className="text-4xl font-bold text-PrimaryBlack mb-1">{particularBlog.title}</h1>
            <p className="text-gray-400 text-md font-medium mb-3">
              <time dateTime={particularBlog.createdAt}>
                {formatDate(particularBlog.createdAt)}
              </time> | by {particularBlog.author_id.username}
            </p>
            <h4 className="text-lg font-medium text-black/60 mb-3">{particularBlog.category}</h4>
            <p className="text-xl italic text-stone-900 mb-6 "style={{
                  fontFamily: "serif",
                
                }}>"{particularBlog.quote}"</p>
          </div>
          <div className="lg:w-2/5 lg:flex lg:justify-end">
            <img
              src={particularBlog.image_url}
              alt={particularBlog.title}
              className="w-full lg:w-3/4 h-auto rounded-lg shadow-2xl"
            />
          </div>
        </div>
        <p className="text-lg text-black/70 mb-8">{particularBlog.description}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button className="flex items-center hover:text-SecondaryPink" onClick={LikeHandler}>
              <svg className="w-6 h-6 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3.172 3.172a4 4 0 015.656 0L10 4.343l1.172-1.171a4 4 0 115.656 5.656L10 16.344l-6.828-6.828a4 4 0 010-5.656z" />
              </svg>
              {particularBlog.likes} Likes
            </button>
            <button className="flex items-center hover:text-SecondaryPurple">
              <svg className="w-6 h-6 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M18 10c0 3.866-3.582 7-8 7a8.58 8.58 0 01-2.43-.357L4 17.667l.755-2.264A7.97 7.97 0 012 10c0-3.866 3.582-7 8-7s8 3.134 8 7z" />
              </svg>
              {particularBlog.comments.length} Comments
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}