import React from "react";
import { CommentHandler } from "../lib/Blog";

export default function Comment({ particularBlog, userId }) {
  function formatDate(date) {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(date));
  }

  return (
    <>
      <form action={CommentHandler.bind(null, particularBlog._id ,userId)} className="mb-4">
        <textarea
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-SecondaryPink"
          rows="3"
          placeholder="Add a comment..."
          name="comment"
        ></textarea>
        <button
          type="submit"
          className="mt-2 px-4 py-2 hover:bg-SecondaryPurple text-white bg-black rounded-lg "
        >
          Submit
        </button>
      </form>

      {/* Comments list */}
      <div className="space-y-4">
        {particularBlog.comments.map((comment, index) => (
          <div key={index} className="p-4 bg-gray-100 rounded-lg">
            <p className="text-black font-medium">{comment.user.username}</p>
            <p className="text-gray-600">{comment.text}</p>
            <time className="text-gray-400 text-sm">
              {formatDate(comment.date)}
            </time>
          </div>
        ))}
      </div>
    </>
  );
}
