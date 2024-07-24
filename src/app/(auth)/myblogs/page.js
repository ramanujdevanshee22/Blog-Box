import React from "react";
import { notFound, redirect } from "next/navigation";
import { VerifyAuth } from "../../../../lib/User";
import { getMyBlogs } from "../../../../lib/Blog";
import { getblogs } from "../../../../lib/Blog";
import Link from "next/link";
import DeletePost from "../../../../components/DeletePost";
export default async function MyBlogs() {
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

    const userID = result.user.id;
    // console.log("1) UserId Frontedn",userID);
    const UserBlogs = await getMyBlogs(userID);

    // console.log("3) UserBlog from frontedn",UserBlogs);

    if(!UserBlogs){
        notFound();
    }

    if (UserBlogs.warning) {
        toast.error(UserBlogs.warning);
    }

   


  
    return(
        <div className="container mx-auto px-4 py-9 w-full max-w-5xl ">
        <h1 className="text-4xl font-bold mb-6 text-center">My Blogs</h1>
        <div className="space-y-16">
            {UserBlogs.map((blog) => (
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
                            className="text-stone-400 hover:bg-stone-100 rounded-md p-2 mt-8 inline-block "
                        >
                            Know More
                        </Link>
                        <DeletePost/>
                    </div>
                </div>
            ))}
        </div>
    </div>
);
}