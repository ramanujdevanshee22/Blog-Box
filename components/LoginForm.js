'use client';

import { useFormState } from 'react-dom';
import React from 'react';
import Link from 'next/link';


function LoginPage({action}) {
  const [state, handleLogin]=useFormState(action, {})
  return (
    <section className="flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-gray-300 mt-8">
        <h2 className="text-2xl font-bold text-center mb-6">Log In</h2>
        <form action={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-SecondaryPink"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-SecondaryPink"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-PrimaryBlack text-white py-2 rounded-lg hover:bg-SecondaryPink transition duration-300"
          >
            Log In
          </button>
          {state.errors && (
          <ul className='text-red-400 font-medium text-md mt-1'>
            {state.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
            
            </ul>)}
        </form>
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{' '}
          <Link href="/signup" className="text-SecondaryPink hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
}

export default LoginPage;
