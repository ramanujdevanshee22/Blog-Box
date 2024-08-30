import { getUserDetails } from "../../../../../lib/User";
import Link from "next/link";
import Image from "next/image";
import Dummy_profile from "../../../../../public/images/blank_profile.png";

export default async function DynamicAccount({ params }) {

    const UserDetails = await getUserDetails(params.userID);

    const formattedDate = new Date(UserDetails.createdAt).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  
    // console.log("Frontend",particularBlog)
    // if (!particularBlog) {
    //    notFound();
    //   return null;
    // }
    return(
      <div className="container mx-auto px-4 py-9 w-full max-w-5xl">
      {/* <h1 className="text-4xl font-bold mb-6 text-center">My Profile</h1> */}
      <div className='flex flex-col items-center bg-white rounded-lg p-8'>
        <div className='flex flex-col items-center w-full'>
          <div className='flex flex-col md:flex-row items-center w-full md:justify-around mb-8'>
            <div  className='flex items-center justify-center mb-4 md:mb-0'>
              {UserDetails.profile_img_url ? (
                <img
                  src={UserDetails.profile_img_url}
                  alt="Profile"
                  className="w-48 h-48 md:w-56 md:h-56 object-cover rounded-full shadow-md"
                />
              ) : (
                <Image
                  src={Dummy_profile}
                  alt="Profile"
                  className="w-48 h-48 md:w-56 md:h-56 object-cover rounded-full shadow-md"
                />
              )}
            </div>
            <div className='text-center md:text-left'>
              <h3 className='text-4xl font-semibold text-gray-800'>{UserDetails.username}</h3>
              <h4 className='text-xl text-gray-600 mb-4'>{UserDetails.email}</h4>
              <hr className='border-y-2 border-radius'></hr>
              <p className='mb-5  text-gray-500'>
                  Member since: <span>{formattedDate}</span>
                </p>
              <div className='text-xl  rounded-2xl p-5   '>
                
                <p className='mb-2'>
                   <span className='text-gray-600 '>💼{" "}{UserDetails.occupation || 'Occupation not provided.'}</span>
                </p>
                <p className='mb-2'>
                 <span className='text-gray-600'>🎂{" "}{UserDetails.age || 'Age not provided.'}</span>
                </p>
                <p className='mb-2'>
                   <span className='text-gray-600'>📍{" "}{ UserDetails.location || 'Location not provided.'}</span>
                </p>
                <p>
                   <span className='text-gray-600'>⭐{" "}{UserDetails.about || 'Summary not provided'}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      
       
      
      </div>
    </div>
    )
   
}
    
    // return <ParticularBlog particularBlog={particularBlog} userId={userId}/>;
  