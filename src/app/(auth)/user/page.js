import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { VerifyAuth } from '../../../../lib/User';
import { redirect } from 'next/navigation';
import { getUserDetails } from "../../../../lib/User";
import Dummy_profile from "../../../../public/images/blank_profile.png";

export default async function UserPage() {
  const result = await VerifyAuth();

  if (!result.user) {
    return redirect('/');
  }

  const userId = result.user.id;
  const user = await getUserDetails(userId);

  
  const formattedDate = new Date(user.createdAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="container mx-auto px-4 py-9 w-full max-w-5xl">
      {/* <h1 className="text-4xl font-bold mb-6 text-center">My Profile</h1> */}
      <div className='flex flex-col items-center bg-white rounded-lg p-8'>
        <div className='flex flex-col items-center w-full'>
          <div className='flex flex-col md:flex-row items-center w-full md:justify-around mb-8'>
            <div  className='flex items-center justify-center mb-4 md:mb-0'>
              {user.profile_img_url ? (
                <img
                  src={user.profile_img_url}
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
              <h3 className='text-4xl font-semibold text-gray-800'>{user.username}</h3>
              <h4 className='text-xl text-gray-600 mb-4'>{user.email}</h4>
              <hr className='border-y-2 border-radius'></hr>
              <p className='mb-5  text-gray-500'>
                  Member since: <span>{formattedDate}</span>
                </p>
              <div className='text-xl  rounded-2xl p-5   '>
                
                <p className='mb-2'>
                   <span className='text-gray-600 '>💼{" "}{user.occupation || 'Occupation not provided.'}</span>
                </p>
                <p className='mb-2'>
                 <span className='text-gray-600'>🎂{" "}{user.age || 'Age not provided.'}</span>
                </p>
                <p className='mb-2'>
                   <span className='text-gray-600'>📍{" "}{ user.location || 'Location not provided.'}</span>
                </p>
                <p>
                   <span className='text-gray-600'>⭐{" "}{user.about || 'Write something about yourself.'}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      
         <Link href="/edit-profile" className="mt-4 bg-SecondaryPurple text-white px-6 py-3 rounded-full shadow-lg hover:bg-SecondaryPink transition-transform transform hover:scale-105 font-medium">
          Edit
         
         </Link>
      
      </div>
    </div>
  );
}
