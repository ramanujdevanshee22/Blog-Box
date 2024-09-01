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

