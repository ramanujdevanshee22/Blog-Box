import React from "react";
import { redirect } from "next/navigation";
import { VerifyAuth } from "../../../../lib/User";
import { getblogs } from "../../../../lib/Blog";
import Link from "next/link";

export default async function BlogPage() {
  const result = await VerifyAuth();

  if (!result.user) {
    return redirect("/");
  }

  function formatDate(date) {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(date));
  }

  const blogs = await getblogs();

  if(blogs.warning){
    toast.error(blogs.warning)
  }

  if (!blogs) {
    return (
      <div className="flex flex-col items-center justify-center mt-8 p-4 rounded shadow-lg">
        <div className="text-yellow-400 text-xl font-bold">⚠️ No Blogs!</div>
        <p className="text-gray-600 mt-2">Try adding some...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-9 w-full max-w-5xl ">
      <h1 className="text-4xl font-bold mb-6 text-center">Blogs</h1>
      <div className="space-y-16">
        {blogs.map((blog) => (
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
                  <span className="mr-2">{blog.likes}</span>
                  <svg
                    className="w-6 h-6 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  <span className="ml-4 mr-2">{blog.comments.length}</span>
                  <svg
                    className="w-6 h-6 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 2H4C2.9 2 2 2.9 2 4V18C2 19.1 2.9 20 4 20H18L22 24V4C22 2.9 21.1 2 20 2ZM20 18L18 16H4V4H20V18Z" />
                  </svg>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-2 font-semibold tracking-wide">
                Shared by {blog.author_id.username} on{" "}
                <time dateTime={blog.createdAt}>
                  {formatDate(blog.createdAt)}
                </time>
              </p>
               {/* <p className="text-gray-400 text-sm mb-2 font-semibold"><time dateTime={blog.createdAt}>
                  {formatDate(blog.createdAt)}
                </time> | by {blog.author_id.username}</p> */}
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
                href={`/blog/${blog._id}`}
                className="text-stone-400 hover:bg-stone-100 rounded-md p-1 mt-8 inline-block"
              >
                Know More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
