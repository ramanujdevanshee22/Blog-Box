"use client";
import React from "react";
import Image from 'next/image';

import Link from "next/link";

import IconB from "../public/images/iconB.png";
import { usePathname } from "next/navigation";


function NavBar() {
  const path = usePathname();

  return (
    <nav className="bg-white font-WorkSans sticky top-0 p-5">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center pb-7">
        <div className="flex items-center">
          <Image src={IconB} width={40} height={30} alt="Icon" />

          <div className="text-4xl font-bold text-PrimaryBlack dark:text-white  ml-2">
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
          {/* <ThemeToggle/> */}
            <Link
              href="/login"
              className={
                path === "/login"
                ? "text-zinc-800 bg-zinc-100 hover:text-white dark:text-zinc-200 dark:bg-zinc-700 dark:hover:bg-SecondaryPink hover:bg-SecondaryPink px-3 py-2 transition duration-300 rounded-lg"
                : "text-zinc-400 hover:text-white dark:text-zinc-500 dark:hover:text-white hover:bg-SecondaryPink dark:hover:bg-SecondaryPink px-3 py-2 transition duration-300 rounded-lg"
            }
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className={
                path === "/signup"
                ? "text-zinc-800 bg-zinc-100 hover:text-white dark:text-zinc-200 dark:bg-zinc-700 dark:hover:bg-SecondaryPink hover:bg-SecondaryPink px-3 py-2 transition duration-300 rounded-lg"
                : "text-zinc-400 hover:text-white dark:text-zinc-500 dark:hover:text-white hover:bg-SecondaryPink dark:hover:bg-SecondaryPink px-3 py-2 transition duration-300 rounded-lg"
              }
            >
              Sign Up
            </Link>
          </>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
