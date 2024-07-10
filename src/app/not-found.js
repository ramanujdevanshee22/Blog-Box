import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NotFoundImage from './../../public/images/404.gif'

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-start  bg-white overflow-hidden">
      <div className="text-center">
        <div className=' flex justify-center'>

        <Image src={NotFoundImage}  width={300} height={300} alt="404 Image" />
        </div>
        <h1 className="text-4xl font-bold text-PrimaryBlack mt-3 md:text-6xl">Page Not Found</h1>
        <p className="text-lg text-gray-500 mt-2">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link href="/"
          className="mt-6 inline-block px-6 py-3 text-lg text-white bg-SecondaryPurple hover:bg-SecondaryPink rounded-lg transition duration-300">
            Go back to Home
         
        </Link>
      </div>
    </div>
  );
}

export default NotFound;