import NewProfilePhoto from "../../../../components/NewProfilePhoto";
import { uploadImage } from "../../../../lib/cloudinary";
import { ChangeProfilePhoto, VerifyAuth } from "../../../../lib/User";
export default async function NewPassword() {
  const result = await VerifyAuth();

  if (!result.user) {
    return redirect("/");
  }

  return <NewProfilePhoto action={changePhoto} />;
}

async function changePhoto(prevState, formData) {
  "use server";
  const photo = formData.get("profile_photo");

  let errors = [];
  let msg="";

  if (photo) {
    const maxSize = 5 * 1024 * 1024;
    if (photo.size > maxSize) {
        errors.push("File size is too large. Please select a file under 5MB.")
    }
  }

  if (errors.length > 0) {
    return { errors };
  }

  let result = await VerifyAuth();
  if (!result || !result.user || !result.user.id) {
    return { errors: ["User authentication failed"] };
  }

  const userId = result.user.id;

  let imageUrl;

  try {
    imageUrl = await uploadImage(photo);
  } catch (error) {
    errors.push(
      "Image upload failed, post was not created. Please try again later."
    );
  }

  const image_url = JSON.parse(JSON.stringify(imageUrl));

  try{
    const changed_photo = await ChangeProfilePhoto(userId,image_url)

    if(changed_photo && changed_photo.success){
        return {msg: changed_photo.success}
    }

    if(changed_photo && changed_photo.error){
        return {errors: [changed_photo.error]}
    }

  }catch (e) {
    console.error(e);
    return { errors: [e.message || "An error occurred while changing the password"] };
  }
}
