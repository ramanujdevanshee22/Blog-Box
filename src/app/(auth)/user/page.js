import React from 'react';
import { VerifyAuth } from '../../../../lib/User';
import { redirect } from 'next/navigation';

export default async function UserPage() {
  const result =  await VerifyAuth();

  // console.log(result.user)
  if(!result.user){
    return redirect('/');
  }

  return(
    <>
    <div>user page</div>
    </>
  )
 
}

