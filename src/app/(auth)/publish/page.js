import React from 'react';
import { redirect } from 'next/navigation';
import { VerifyAuth } from '../../../../lib/User';
import CreateBlog from "../../../../components/CreateBlog";
import { createBlog } from '../../../../lib/Blog';

export default async function newBlog() {

  const result =  await VerifyAuth();

  // console.log(result.user)
    if(!result.user){
      return redirect('/');
    }


  return <CreateBlog action={createBlog}/>;
}

