import EditProfile from "../../../../components/EditProfile";
import { EditUserDetails, VerifyAuth } from "../../../../lib/User";
import { getUserDetails } from "../../../../lib/User";
import { uploadImage } from "../../../../lib/cloudinary";

export default async function editUser() {
  const result = await VerifyAuth();

  // console.log(result.user);
  if (!result.user) {
    return redirect("/");
  }
  const userId = result.user.id;
  const user = await getUserDetails(userId);

  const User = JSON.parse(JSON.stringify(user));

  return <EditProfile user={User} />
} 

// async function modifyUser(prevState,formData){
//   "use server"
//   const username = formData.get("username") || "";
//   const email = formData.get("email") || "";
//   const about = formData.get("about") || "";
//   const photo = formData.get("photo") || "";
//   const occupation = formData.get("occupation") || "";
//   const age = formData.get("age") || "";
//   const location = formData.get("location") || "";

//   let imageUrl;
//   let warning="";
//   let msg="";

//   try {
//     imageUrl = await uploadImage(photo);
//   } catch (error) {
//     warning=
//       "Image upload failed, post was not created. Please try again later.";
//       return {warning};
    
//   }

//   const profile_image_url = JSON.parse(JSON.stringify(imageUrl));
//   let updatedData = {
//     username,
//     email,
//     about,
//     location,
//     age,
//     occupation,
//     profile_image_url
//   }

//   console.log("Frontend",updatedData);

//   const result = await VerifyAuth();
//   const user_id = result.user.id;

//   try{

//     const response = await EditUserDetails(user_id,updatedData);
  
//     if(response.warning){
//       warning = response.warning
//       return {warning};
//     }


//     if(response.success){
//       msg="Updated Successfully"
//       return {msg}
//     }
    
//     if(!response.success){
//       warning=response.error
//       return {warning}
//     }

//   }catch (error) {
//     warning=error
//     // console.log(errors)
//     return { warning }
//   }}



