import React from "react";
import { redirect } from "next/navigation";
import { VerifyAuth } from "../../../../lib/User";
import CreateBlog from "../../../../components/CreateBlog";
import { addBlog } from "../../../../lib/Blog";
import { uploadImage } from "../../../../lib/cloudinary";
import { toast } from "sonner";

export default async function newBlog() {
  const result = await VerifyAuth();

  // console.log(result.user);
  if (!result.user) {
    return redirect("/");
  }

  return <CreateBlog action={createBlog} />;
}



async function createBlog(prevState, formData) {
  "use server";

  const title = formData.get("title");
  const quote = formData.get("quote");
  const description = formData.get("description");
  const photo = formData.get("photo");
  const category = formData.get("category");

  let errors = [];
  if (title.trim().length == null) {
    errors.push("Title is required.");
  }

  if (quote.trim().length == undefined) {
    errors.push("Quote is required.");
  }
  if (!description || description.trim().length === 0) {
    errors.push("Description is required.");
  }
  if (!category) {
    errors.push("Category is required.");
  }

  if (!photo || photo.size === 0) {
    errors.push("Image is required.");
  }

  if (photo) {
    const maxSize = 5 * 1024 * 1024;
    if (photo.size > maxSize) {
      errors.push("File size is too large. Please select a file under 5MB.");
    }
  }

  if (title.length < 4) {
    errors.push("Title must be at least 4 characters long.");
  }
  if (description.length < 20) {
    errors.push("Description must be at least 20 characters long.");
  }
  if (quote.length < 6) {
    errors.push("Quote must be at least 6 characters long.");
  }

  if (errors.length > 0) {
    return { errors };
  }

  let imageUrl;

  try {
    imageUrl = await uploadImage(photo);
  } catch (error) {
    errors.push(
      "Image upload failed, post was not created. Please try again later."
    );
  }

  const image_url = JSON.parse(JSON.stringify(imageUrl));

  const result = await VerifyAuth();
  const author_id = result.user.id;

  let msg=""
  let warning=""
  try {
    const answer = await addBlog({
      title,
      quote,
      description,
      category,
      image_url,
      author_id,
    });

     
    if(answer.warning){
      warning=answer.warning
     return {warning}
    }

    console.log(answer.message);
    msg=answer.message;
    return {msg}
   

   
  } catch (error) {
    errors.push(error);
    console.log(errors)
    return { errors };
  }
  // redirect("/blog");
}
