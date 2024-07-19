"use client";
import Link from "next/link";

export default function NewPostError({ error }) {
  return (
    <div className="flex items-center justify-center bg-white overflow-hidden pt-8 font-WorkSans ">
      <div className="flex flex-col items-start max-w-md md:text-left p-6 bg-red-100 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-red-600 mb-4">
          An error occurred!
        </h2>
        <p className="text-xl text-zinc-400 mb-4">
          Unfortunately, something went wrong.
        </p>
        <p className="text-xl text-zinc-400 mb-8">{error.message}</p>
        <Link
          href="/blogs"
          className="text-lg text-white bg-SecondaryPink hover:bg-SecondaryOrange px-6 py-3 rounded-full transition duration-300"
        >
          Go back to Publish
        </Link>
      </div>
    </div>
  );
}
