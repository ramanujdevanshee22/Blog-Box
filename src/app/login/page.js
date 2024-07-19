import React from "react";
import { redirect } from 'next/navigation';

import LoginForm from '../../../components/LoginForm';
import { Login } from '../../../lib/User';
import NavBar from '../../../components/NavBar';
import { VerifyAuth } from "../../../lib/User";

export default async function LoginPage() {
  const result =  await VerifyAuth();

  
    if(result.user){
      return redirect('/blog');
    }
  return(
    <>
    <NavBar/>
    <LoginForm action={LoginUser}/>
    </>
  ) 
}
  async function LoginUser(prevState, formData) {
    "use server";

    const email = formData.get("email");
    const password = formData.get("password");

    let errors = [];

    if (!email || email.trim().length === 0) {
      errors.push("Email is required.");
    }

    if (!email.includes("@") || !email.includes(".")) {
      errors.push("Invalid email address");
    }

    if (errors.length > 0) {
      return { errors };
    }

    try {
      await Login({
        email,
        password,
      });
    } catch (error) {
      errors.push(error.message);
      return { errors };
    }

    redirect("/blog");
  }

  

 

