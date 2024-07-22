"use client";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import Link from "next/link";
import Image from "next/image";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import FormSubmit from "./FormSubmit";

function BlogPostForm({ action }) {
  const [state, handleNewBlog] = useFormState(action, {});
  const [imagePreview, setImagePreview] = useState();
  const router = useRouter();

  useEffect(() => {
    if(state.warning){
      toast.error(state.warning)
      router.push("/publish")
    }
    if (state.msg) {
      toast.success(state.msg);
      router.push("/blog");
    }
  }, [state.msg]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-full max-w-5xl mt-6">
        <h2 className="text-2xl font-bold text-center mb-6">Generate Blog</h2>
        <form action={handleNewBlog} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
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
              <label className="block text-gray-700 font-semibold mb-2">
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
            <label className="block text-gray-700 font-semibold mb-2">
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
              <label className="block text-gray-700 font-semibold mb-2">
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
              </select>
            </div>
            <div className="">
              <label className="block text-gray-700 font-semibold mb-1">
                Image Upload
              </label>
              <div className="flex w-full">
                <div className="p-1 mr-3">
                  <input
                    type="file"
                    id="imageFile"
                    name="photo"
                    accept="image/*"
                    onChange={handleImageChange}
                    className=" px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-SecondaryPurple"
                  />

                  {/* <label
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    for="file_input"
                  >
                    Upload file
                  </label>
                  <input
                    class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer  dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="file_input"
                    type="file"
                  />*/}
                </div>
                {imagePreview && (
                  <Image
                    src={imagePreview}
                    alt="sample img"
                    width={128}
                    height={128}
                    sizes="100vw "
                    className="w-32 mt-2 rounded-md shadow-lg"
                  />
                )}
              </div>
            </div>
          </div>
          <FormSubmit />

          {state.errors && (
            <ul className="text-red-400 font-medium text-md mt-4">
              {state.errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          )}
        </form>
      </div>
    </section>
  );
}

export default BlogPostForm;
