import React from 'react';
import { notFound } from 'next/navigation';
import {getParticularBlog} from '../../../../../lib/Blog';


export default async function DynamincBlog({params}) {
    const particularBlog = await getParticularBlog(params.id);

    if(!particularBlog){
      notFound();
    }


  return (
    <div>{particularBlog.title}</div>
  )
}

