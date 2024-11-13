"use client";
import React from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import * as Yup from "yup";

import { EditUserDetails } from "../lib/User";
import { Field, Form, Formik, useFormik } from "formik";

const validationSchema = Yup.object({
  username: Yup.string()
    .required("Username is required")
    .max(20, "Maximum 20 characters"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email address is required"),
  about: Yup.string()
    .required("About text is required")
    .max(100, "Maximum 100 characters are allowed"),
  occupation: Yup.string()
    .required("Occupation is required")
    .max(20, "Maximum 20 characters are allowed"),
  age: Yup.number()
    .required("Age is required")
    .min(18, "You must be at least 18 years old"),
  location: Yup.string()
    .required("Location is required")
    .max(20, "Maximum 20 characters are allowed"),
});

const generateErrorMessage = (message) => {
  return <p className="text-red-500 text-sm mt-1">{message}</p>;
};

export default function EditProfile({ user }) {
  const router = useRouter();
  const InitialSchema = {
    username: user.username || "",
    email: user.email || "",
    about: user.about || "",
    occupation: user.occupation || "",
    age: user.age || "",
    location: user.location || "",
  };
  const handleSubmit = async (values) => {
    // console.log(values);
    // const updatedData = {
    //   ...formData,
    //   photo: user.profile_img_url,
    // };

    // console.log("Frontend", updatedData);

    try {
      const response = await EditUserDetails(user._id, values);

      if (response.warning) {
        toast.error(response.warning);
      }

      if (response.success) {
        toast.success("Profile updated successfully!");
        router.push("/user");
      } else {
        toast.error("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.log("Error updating profile", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const formik = useFormik({
    initialValues: InitialSchema,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <section className="flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-full max-w-5xl mt-6">
        <h2 className="text-2xl font-bold text-center mb-6">Edit Details</h2>
        <Formik
          initialValues={InitialSchema}
          className="space-y-4"
          onSubmit={formik.handleSubmit}
        >
          <Form>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Username
                </label>
                <Field
                  type="text"
                  id="username"
                  name="username"
                  {...formik.getFieldProps("username")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-SecondaryPurple"
                />
                {formik.touched.username &&
                  formik.errors.username &&
                  generateErrorMessage(formik.errors.username)}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  {...formik.getFieldProps("email")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-SecondaryPurple"
                />
                {formik.touched.email &&
                  formik.errors.email &&
                  generateErrorMessage(formik.errors.email)}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                About
              </label>
              <Field
                as="textarea"
                id="about"
                {...formik.getFieldProps("about")}
                name="about"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-SecondaryPurple"
              />
              {formik.touched.about && formik.errors.about && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.about}
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Occupation
                </label>
                <Field
                  type="text"
                  id="occupation"
                  {...formik.getFieldProps("occupation")}
                  name="occupation"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-SecondaryPurple"
                />
                {formik.touched.occupation && formik.errors.occupation && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.occupation}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Age
                </label>
                <Field
                  type="number"
                  id="age"
                  name="age"
                  {...formik.getFieldProps("age")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-SecondaryPurple"
                />
                {formik.touched.age && formik.errors.age && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.age}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Location
                </label>
                <Field
                  type="text"
                  id="location"
                  {...formik.getFieldProps("location")}
                  name="location"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-SecondaryPurple"
                />
                {formik.touched.location && formik.errors.location && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.location}
                  </p>
                )}
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
                disabled={formik.isSubmitting || !formik.isValid}
                className="disabled:opacity-50 disabled:cursor-not-allowed shadow-lg bg-PrimaryBlack text-white py-2 px-4 rounded-lg hover:bg-SecondaryPurple transition duration-300"
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
          </Form>
        </Formik>
      </div>
    </section>
  );
}
