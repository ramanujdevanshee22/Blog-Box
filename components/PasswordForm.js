'use client';

import { useFormState } from 'react-dom';
import React, { useState, useEffect} from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import Image from 'next/image';
import Show from "../public/images/show.png";
import Hide from "../public/images/hide.png";
import { useRouter } from 'next/navigation';

export default  function PasswordPage({ action }) {
  const [state, handlepassword] = useFormState(action, {});
  const router = useRouter();
  
  useEffect(() => {
    if (state.errors && state.errors.length > 0) {
      toast.error(state.errors[0]);
      router.push("/user");
    }

    if (state.msg) {
      toast.success(state.msg);
      router.push("/user");
    }
  }, [state.msg, state.errors, router]);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  return (
    <section className="flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-gray-300 mt-8">
        <h2 className="text-2xl font-bold text-center mb-6">Change Password</h2>
        <form action={handlepassword}>
          <div className="mb-4">
            <label htmlFor="current_pw" className="block text-gray-700 font-semibold mb-2">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                id="current_pw"
                name="current_pw"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-SecondaryPink"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? <Image src={Show} height={10} width={20}/>  : <Image src={Hide} height={10} width={20}/>}
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="new_pw" className="block text-gray-700 font-semibold mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                id="new_pw"
                name="new_pw"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-SecondaryPink"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
             {showNewPassword ? <Image src={Show} height={10} width={20}/>  : <Image src={Hide} height={10} width={20}/>}
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="re_pw" className="block text-gray-700 font-semibold mb-2">
              Re-enter New Password
            </label>
            <div className="relative">
              <input
                type={showRePassword ? 'text' : 'password'}
                id="re_pw"
                name="re_pw"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-SecondaryPink"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                onClick={() => setShowRePassword(!showRePassword)}
              >
              {showRePassword ? <Image src={Show} height={10} width={20} alt='Show'/>  : <Image src={Hide} height={10} width={20} alt='Hide'/>}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-PrimaryBlack text-white py-2 rounded-lg hover:bg-SecondaryPink transition duration-300"
          >
            Change
          </button>
          {state.errors && (
            <ul className="text-red-400 font-medium text-md mt-1">
              {state.errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          )}
        </form>
        
      </div>
    </section>
  );
}


