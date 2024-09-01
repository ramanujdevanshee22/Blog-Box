'use client';

import React, { useState, useEffect } from 'react';
import { useFormState } from 'react-dom';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function NewProfilePhoto({ action }) {
  const [state, handlePhotoChange] = useFormState(action, {});
  const router = useRouter();

  useEffect(() => {
    if (state.errors && state.errors.length > 0) {
      state.errors.forEach((error) => toast.error(error));
    }
    if (state.msg) {
      toast.success(state.msg);
      router.push("/user");
    }
  }, [state.errors, state.msg, router]);

  const [showPreview, setShowPreview] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handlePhotoPreview = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      setShowPreview(true);
    }
  };

  return (
    <section className="flex items-center justify-center ">
      <div className="bg-white p-8 rounded-lg lg:shadow-md md:shadow-lg w-full max-w-md lg:border md:border border-gray-300 mt-8">
        <h2 className="text-2xl font-bold text-center mb-6">Upload Profile Photo</h2>
        <form action={handlePhotoChange}>
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="profile_photo">
            New Profile Photo
          </label>

          <div className="relative">
            <input
              type="file"
              id="profile_photo"
              name="profile_photo"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer "
              onChange={handlePhotoPreview}
              required
            />
            <div className="w-full bg-gray-200 text-center py-2 rounded-lg border border-gray-300">
              <span className="text-gray-700">Choose file</span>
            </div>
          </div>

          {showPreview && previewUrl && (
            <div className="mt-4 flex justify-center items-center">
              <img
                src={previewUrl}
                alt="Preview"
                className="rounded-2xl"
                width={180}
                height={180}
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-PrimaryBlack text-white py-2 rounded-lg hover:bg-SecondaryPink transition duration-300 mt-4"
          >
            Upload
          </button>
        </form>
      </div>
    </section>
  );
}
