import { redirect } from 'next/navigation';
import { storeUser } from '../../../lib/User';

import SignupForm from '../../../components/SignupForm';

export default function SignUp() {
  async function createUser(prevState, formData) {
    'use server';
   
    const username= formData.get('username');
    const email=formData.get('email')
    const password=formData.get('password')
   

    let errors = [];

    if (!username || username.trim().length === 0) {
      errors.push('Username is required.');
    }


    if (!email || email.trim().length === 0 ) {
      errors.push('Email is required.');
    }

    if(!email.includes('@') || !email.includes(".")){
      errors.push('Invalid email address')
    }

    if (errors.length > 0) {
      return { errors };
    }

    try {
      await storeUser({
        username,
        email,
        password
      });
     
    } catch (error) {
      errors.push(error.message);
      return { errors };
    }

    redirect('/login');
  }

  return <SignupForm action={createUser} />;
}