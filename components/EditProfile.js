"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
// import { EditUserDetails } from "../lib/User";
import Link from "next/link";
import { EditUserDetails } from "../lib/User";

export default function EditProfile({ user }) {
// console.log("Passed Detail at frontend",user);
// const [state, handleUpdate] = useFormState(action, {});
  // const [imagePreview, setImagePreview] = useState();
  const [formData, setFormData] = useState({
    username: user.username || "",
    email: user.email || "",
    about: user.about || "",
    occupation: user.occupation || "",
    age: user.age || "",
    location: user.location || "",

  });
  const router = useRouter();

  // let file;
  // const handleImageChange = (e) => {
  // file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImagePreview(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // useEffect(() => {
  //   if(state.warning){
  //     toast.error(state.warning)
  //     router.push("/user")
  //   }
  //   if (state.msg) {
  //     toast.success(state.msg);
  //     router.push("/user");
  //   }
  // }, [state.msg]);


  const handleSubmit = async (e) => {
    e.preventDefault();
 
    console.log("calling handleSubmit function");
    console.log("Begininggg...");
    
    const updatedData = {
      ...formData,
      photo: user.profile_img_url, };

    console.log("Frontend",updatedData);

      try {

         const response = await EditUserDetails(user._id,updatedData);

        if(response.warning){
          toast.error(response.warning);
        }

        if (response.success) {
          toast.success("Profile updated successfully!");
          router.push("/user");
        } else {
          toast.error("Failed to update profile. Please try again.");
        }
      } catch (error) {
        toast.error("An error occurred. Please try again.");
      }
    }

  return (
    <section className="flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-full max-w-5xl mt-6">
        <h2 className="text-2xl font-bold text-center mb-6">Edit Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-SecondaryPurple"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-SecondaryPurple"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              About
            </label>
            <textarea
              id="about"
              name="about"
              value={formData.about}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-SecondaryPurple"
            ></textarea>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Occupation
              </label>
              <input
                type="text"
                id="occupation"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-SecondaryPurple"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-SecondaryPurple"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-SecondaryPurple"
              />
            </div>
             <div className="sm:space-x-4 sm:mt-7 my-4 space-x-2">
             <Link
              href="/new-password"
              className="shadow-lg bg-PrimaryBlack text-white py-2 px-4 rounded-lg hover:bg-SecondaryPink transition duration-300"
            >
              Change passowrd
            </Link>
            <Link
              href="/profile-photo"
              className="shadow-lg bg-PrimaryBlack text-white py-2 px-4 rounded-lg hover:bg-SecondaryPink transition duration-300 "
            >
              Change Photo
            </Link>
              {/* <label className="block text-gray-700 font-semibold mb-1">
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
                </div>
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="sample img"
                    width={128}
                    height={128}
                    sizes="100vw"
                    className="w-32 mt-2 rounded-md shadow-lg"
                  />
                ) : user.profile_img_url ? (
                  <Image
                    src={user.profile_img_url}
                    alt="sample img"
                    width={128}
                    height={128}
                    sizes="100vw"
                    className="w-32 mt-2 rounded-md shadow-lg"
                  />
                ) : null} */} 
              {/* </div> */}
            </div>
          </div>
          <div className="flex justify-start space-x-4">
            <button
              type="submit"
                
              className="shadow-lg bg-PrimaryBlack text-white py-2 px-4 rounded-lg hover:bg-SecondaryPurple transition duration-300"
            >
       Edit
            </button>
            <Link
              href="/user"
              className="shadow-lg bg-PrimaryBlack text-white py-2 px-4 rounded-lg hover:bg-SecondaryPink transition duration-300"
            >
              Cancel
            </Link>
          
          </div>
          {/* <FormSubmit btn1="Edit" href2="/user" msg="Updating User.." /> */}

          
        </form>
      </div>
    </section>
  );

}
