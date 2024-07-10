import React from 'react';
import { NewBlog } from '../../../lib/Blog';
import CreateBlog from "../../../components/CreateBlog";

export default function createBlog() {
  async function createBlog(prevState,formData){
    'use server';
    const title= formData.get('title');
    const quote=formData.get('quote');
    const description=formData.get('description');
    const photo=formData.get('photo');
    const category=formData.get('category');
    console.log(`${title}/n${quote}/n${description}${category}`);
    console.log(photo)
  }
  return <CreateBlog action={createBlog}/>;
}

