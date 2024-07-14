import React from 'react'
import {redirect} from 'next/navigation';
import { VerifyAuth } from '../../../../lib/User';

export default async function BlogPage() {
  const result =  await VerifyAuth();

//  console.log(result.user)
  if(!result.user){
    return redirect('/');
  }

  return (
    <div>BlogPage</div>
  )
}

