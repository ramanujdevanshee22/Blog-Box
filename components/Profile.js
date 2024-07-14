'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dummy from '../public/images/girl.png';
import { logout } from '../lib/User';

function Profile() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div className='relative'>
      <div onClick={toggleDropdown} className='cursor-pointer'>
        <Image src={dummy} className='w-10 h-10 rounded-full' />
      </div>
      {isOpen && (
        <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl py-1'>
          <Link href="/profile" className='block px-4 py-2 text-PrimaryBlack hover:text-SecondaryPink'>
            Profile
          </Link>
          <form action={logout} className='block px-4 py-2 text-PrimaryBlack  hover:text-SecondaryPink w-full text-left'>
      <button>Log out</button>
    </form>
       
        </div>
      )}
    </div>
  );
}

export default Profile;
