"use client";
import React from "react";
import { useState } from "react";
import { CommentHandler, DeleteCommentHandler } from "../lib/Blog";
import { toast } from "sonner";
import LikeButton from "./LikeButton";
import Image from "next/image";
import Link from "next/link";

export default function Feedback({ particularBlog, userId, isLiked }) {
  function formatDate(date) {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(date));
  }

  const [Comment, setComment] = useState("");
  const [allComments, setAllComments] = useState(particularBlog.comments);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(Comment)
    if (!Comment) {
      toast.error("Please enter a comment.");
    }
    if (Comment) {
      // const newComment = {
      //   user: userId.id,
      //   text: Comment,
      //   date: new Date().toISOString(),
      // };
      try {
        const updatedComments = await CommentHandler(
          Comment,
          particularBlog._id,
          userId
        );
        setAllComments(updatedComments);
        setComment("");
      } catch (e) {
        console.log(e);
        toast.error("Failed to add comment");
      }
    }
  };

  const handleDelete = async (commentId) => {
    try {
      const updatedComments = allComments.filter(
        (comment) => comment._id !== commentId
      );
      setAllComments(updatedComments);

      await DeleteCommentHandler(particularBlog._id, commentId);
    } catch (e) {
      console.log(error);
      toast.error("Failed to delete comment:");
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <LikeButton blog={particularBlog} userId={userId} isLiked={isLiked} />

          <button className="flex items-center hover:text-SecondaryPurple">
            <svg
              className="w-6 h-6 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M18 10c0 3.866-3.582 7-8 7a8.58 8.58 0 01-2.43-.357L4 17.667l.755-2.264A7.97 7.97 0 012 10c0-3.866 3.582-7 8-7s8 3.134 8 7z" />
            </svg>
            {allComments.length} Comments
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-SecondaryPink"
          rows="3"
          placeholder="Add a comment..."
          name="comment"
          value={Comment}
          onChange={(e) => setComment(e.target.value)}
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
        {allComments.map((comment) => (
          <div
            key={comment._id}
            className="p-4 bg-gray-100 rounded-lg flex justify-between items-center"
          >
            <div>
              <div className="flex flex-row gap-3 items-center">
                <Image
                  src={
                    comment.user?.profile_img_url || "/images/blank_profile.png"
                  }
                  alt={""}
                  width={40}
                  height={40}
                  className="rounded-full w-10 h-10"
                />
                <Link
                  href={`/account/${comment.user?._id || ""}`}
                  className="text-black font-medium text-sm"
                >
                  {comment.user?.username || "Stranger"}
                </Link>
              </div>
              <p></p>
              <p className="text-gray-600">{comment.text}</p>
              <time className="text-gray-400 text-sm">
                {formatDate(comment.date)}
              </time>
            </div>
            {(userId.id === comment.user ||
              userId.id === particularBlog.author_id._id) && (
              <button
                title="Delete"
                onClick={() => handleDelete(comment._id)}
                className="text-red-500 hover:text-red-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.137 21H7.863a2 2 0 01-1.996-1.858L5 7m5-4h4m-4 0a2 2 0 00-2 2h8a2 2 0 00-2-2m-4 0V3m0 0H7m4 0h2"
                  />
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
