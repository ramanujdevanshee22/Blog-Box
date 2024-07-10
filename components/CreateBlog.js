"use client";

import React from "react";
import { useFormState } from "react-dom";
import Link from "next/link";

function BlogPostForm({ action }) {
  const [state, handleBlogSubmit] = useFormState(action, {});

  return (
    <section className="flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-5xl mt-8">
        <h2 className="text-2xl font-bold text-center mb-6">Generate Blog</h2>
        <form action={handleBlogSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 font-semibold mb-2"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-SecondaryPurple"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-semibold mb-2"
              >
                Quote
              </label>
              <input
                type="text"
                id="quote"
                name="quote"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-SecondaryPurple"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-SecondaryPurple"
              required
            ></textarea>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 font-semibold mb-2"
              >
                Image Upload
              </label>
              <input
                type="file"
                id="imageFile"
                name="photo"
                accept="image/*"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-SecondaryPurple"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-semibold mb-2 "
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                className="w-full px-3 py-[0.68rem] border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-SecondaryPurple"
                required
              >
                <option value="">Select a category</option>
                <option value="Technology">Technology</option>
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
              </select>
            </div>
          </div>
          <div className="flex justify-start space-x-4">
            <button
              type="submit"
              className="bg-PrimaryBlack text-white py-2 px-4 rounded-lg hover:bg-SecondaryPurple transition duration-300"
            >
              Publish
            </button>
            <button
              type="button"
              className="bg-PrimaryBlack text-white py-2 px-4 rounded-lg hover:bg-SecondaryPink transition duration-300"
            >
              Cancel
            </button>
          </div>
          {/* {state.errors > 0 && (
            <ul className="text-red-400 font-medium text-md mt-4">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          )} */}
        </form>
      </div>
    </section>
  );
}

export default BlogPostForm;
