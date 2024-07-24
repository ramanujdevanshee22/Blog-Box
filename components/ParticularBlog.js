import React from "react";
import Feedback from "./Feedback";


export default function ParticularBlog({ particularBlog, userId }) {


  function formatDate(date) {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(date));
  }

  const isLiked = particularBlog.likes.includes(userId.id);

  

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


        {/* Comment input field and like button*/}
        <Feedback particularBlog={particularBlog} userId={userId} isLiked={isLiked}/>
      </div>
    </div>
  );
}
