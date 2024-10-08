"use client";
import React from "react";
import Image from "next/image";
import Profile from "./Profile";
import Link from 'next/link'
import IconB from "../public/images/iconB.png";
import { usePathname } from "next/navigation";


function NavBarAuth({user}) {
  const path = usePathname();

  return (
    <nav className="bg-white font-WorkSans sticky top-0 p-5">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center pb-7">
        <div className="flex items-center">
          <Image src={IconB} width={40} height={40} alt="Icon" />
          
          <div className="text-4xl font-bold text-PrimaryBlack ml-2">
            <Link href="/">
              Blog
              <span className="text-SecondaryPurple hover:text-SecondaryOrange">
                Box
              </span>
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap justify-center text-md lg:justify-end space-x-4 lg:text-xl">
          <>
          <Link
            title="All blogs"
              href="/blogs"
              className={
                path === "/blogs"
                  ? "text-zinc-800 bg-zinc-100 hover:text-white hover:bg-SecondaryPink px-3 py-2 transition duration-300 rounded-lg"
                  : "text-zinc-400 hover:text-white hover:bg-SecondaryPink px-3 py-2 transition duration-300 rounded-lg"
              }
            >
              Blogs
            </Link>

            <Link
            title="My blogs"
              href="/myblogs"
              className={
                path === "/myblogs"
                  ? "text-zinc-800 bg-zinc-100 hover:text-white hover:bg-SecondaryPink px-3 py-2 transition duration-300 rounded-lg"
                  : "text-zinc-400 hover:text-white hover:bg-SecondaryPink px-3 py-2 transition duration-300 rounded-lg"
              }
            >
              My Blogs
            </Link>
          
            <Link 
              title="Create new blog"
              href="/publish"
              className={
                path === "/publish"
                  ? "text-zinc-800 bg-zinc-100 hover:text-white hover:bg-SecondaryPink px-3 py-2 transition duration-300 rounded-lg"
                  : "text-zinc-400 hover:text-white hover:bg-SecondaryPink px-3 py-2 transition duration-300 rounded-lg"
              }
            >
              Publish
            </Link>
            <Profile user={user} />
          </>
        </div>
      </div>
    </nav>
  );
}

export default NavBarAuth;
