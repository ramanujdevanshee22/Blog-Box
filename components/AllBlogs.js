'use client'
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { DeletePost } from "../components/DeletePost";

export default function AllBlogs({ blogs: initialBlogs, isDelete, userId }) {
  const [sortOption, setSortOption] = useState("latest");
  const [categoryFilter, setCategoryFilter] = useState("all");


  const filteredBlogs = useMemo(() => {
    let updatedBlogs = [...initialBlogs];

    if (categoryFilter !== "all") {
      updatedBlogs = updatedBlogs.filter((blog) => blog.category.toLowerCase() === categoryFilter.toLowerCase());
    }

    if(categoryFilter == "all"){
      updatedBlogs = initialBlogs;
    }

    updatedBlogs = updatedBlogs.sort((a, b) => {
      if (sortOption === "latest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortOption === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      return 0;
    });

    return updatedBlogs;
  }, [sortOption, categoryFilter, initialBlogs]);

  function formatDate(date) {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(date));
  }

  return (
    <div className="container mx-auto px-4 py-9 w-full max-w-5xl">
      <h1 className="text-4xl font-bold mb-6 text-center">Blogs</h1>

      <div className="flex justify-between mb-6">
        <div>
          <label htmlFor="sort" className="mr-2">Sort by:</label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="p-2 rounded border border-gray-300"
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>

        <div>
          <label htmlFor="category" className="mr-2">Category:</label>
          <select
            id="category"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="p-2 rounded border border-gray-300"
          >
            <option value="all">All</option>
                <option value="Technology">Technology</option>
                <option value="Technology">Lifestyle</option>
                <option value="Technology">Education</option>
                <option value="Food">Food</option>
                <option value="Sports">Sports</option>
                <option value="Music">Music</option>
                <option value="Politics">Politics</option>
                <option value="Movie">Movie</option>
                <option value="Fitness">Fitness</option>
                <option value="Travel">Travel</option>
                <option value="Beauty">Beauty</option>
                <option value="Fashion">Fashion</option>
                <option value="Books">Books</option>
                <option value="Religion">Religion</option>
                <option value="Photography">Photography</option>
                <option value="Business">Business</option>
                <option value="Art">Art</option>
                <option value="News">News</option>
                <option value="News">Science</option>
                <option value="News">Environment</option>
             
          </select>
        </div>
      </div>

      <div className="space-y-16">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white p-4 rounded-lg shadow-lg flex items-start"
            >
              <img
                src={blog.image_url}
                alt={blog.title}
                className="w-48 h-48 object-cover rounded-lg mr-4"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold tracking-normal">
                    {blog.title}
                  </h2>
                  <div className="flex items-center">
                    <span className="mr-2">{blog.likes.length}</span>
                    <svg
                      className="w-6 h-6 text-red-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    <span className="ml-4 mr-2">{blog.comments.length}</span>
                    <svg
                      className="w-6 h-6 mr-1 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M18 10c0 3.866-3.582 7-8 7a8.58 8.58 0 01-2.43-.357L4 17.667l.755-2.264A7.97 7.97 0 012 10c0-3.866 3.582-7 8-7s8 3.134 8 7z" />
                    </svg>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-2 font-semibold tracking-wide">
                  Shared by {blog.author_id.username} on{" "}
                  <time dateTime={blog.createdAt}>
                    {formatDate(blog.createdAt)}
                  </time>
                </p>
                <p
                  className="text-stone-600 italic mt-6 overflow-hidden"
                  style={{
                    fontFamily: "serif",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                  }}
                >
                  {blog.quote}
                </p>
                <Link
                  href={`/blogs/${blog._id}`}
                  className="text-stone-400 hover:bg-stone-100 rounded-md p-1 mt-8 inline-block"
                >
                  Know More
                </Link>
                {isDelete &&  <DeletePost blogId={blog._id} userId={userId}/>}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center mt-32 p-4 rounded">
            <div className="text-SecondaryPink text-3xl font-bold">⚠️ No Blog on this particular topic!</div>
            <p className="text-gray-600 mt-2 animate-pulse text-lg">Try adjusting your filters...</p>
          </div>
        )}
      </div>
    </div>
  );
}
