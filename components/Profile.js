'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Dummy_profile from "../public/images/blank_profile.png";
import { logout } from '../lib/User';


function Profile({user}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogoutClick = (e) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const confirmLogout = () => {
    setShowConfirm(false);
    logout();
  };

  const cancelLogout = () => {
    setShowConfirm(false);
  };

  return (
    <div onClick={toggleDropdown} className='relative'>
      <div  className='cursor-pointer'>
      {user.profile_img_url ? (
                <img
                  src={user.profile_img_url}
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <Image
                  src={Dummy_profile}
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
              )}
             
      </div>
      {isOpen && (
        <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl py-1'>
          <Link href={`/user`} className='block px-4 py-2 text-PrimaryBlack hover:text-SecondaryPink'>
            Profile
          </Link>
          <button onClick={handleLogoutClick} className='block w-full text-left px-4 py-2 text-PrimaryBlack hover:text-SecondaryPink'>
            Log out
          </button>
        </div>
      )}

      
{showConfirm && (
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50'>
          <div className='bg-white p-6 rounded-md shadow-md w-80'>
            <h2 className='text-lg font-semibold mb-4'>Confirm Logout</h2>
            <p className='text-base mb-4'>Are you sure you want to log out?</p>
            <div className='flex justify-end space-x-2'>
              <button
                onClick={cancelLogout}
                className='bg-gray-200 hover:bg-gray-400 text-gray-800 rounded-md px-3 py-1'
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className='bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded-md'
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
