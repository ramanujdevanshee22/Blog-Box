"use server";
import { revalidatePath } from "next/cache";
import Blog from "../model/Blog";
import { connect } from "./connectDB";
import mongoose from "mongoose";


export async function addBlog({
  title,
  quote,
  description,
  category,
  image_url,
  author_id,
}) {
  try {

    try {
      await connect();
    } catch (error) {
      console.error("Error connecting to the database:", error);
      return {warning:"Failed to connect to the database. Please try again later."};
    
    }
    
    
    const newBlog = new Blog({
      title,
      quote,
      description,
      category,
      image_url,
      author_id,
    });

    await newBlog.save();
    revalidatePath('/')

    return { message: "Blog added successfully!" };
  } catch (error) {
    console.error("Error adding blog:", error);
    return {warning: "Failed to add blog. Please try again later."};
  }
}

export async function getblogs(){
  try {
    await connect();
  } catch (error) {
    console.error("Error connecting to the database:", error);
    return {warning:"Failed to connect to the database. Please try again later."};
  
  }

  try {
    const blogs = await Blog.find().populate('author_id', 'username').exec();
    // console.log("Backend blogs",blogs);
    return blogs;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return { warning: "Failed to fetch blogs. Please try again later." };
  }
  
}

export async function getParticularBlog(id){
  try {
    await connect();
  } catch (error) {
    console.error("Error connecting to the database:", error);
    return {warning:"Failed to connect to the database. Please try again later."};
  
  }

  try{ 
    const blog = await Blog.findById(id).populate('author_id', 'username').exec();
    console.log(blog);
    if (!blog) {
      return ; 
    }
    
    return blog;

  } catch (error) {
    console.error("Error fetching blog: ", error);
    return { warning: "Failed to fetch blog. Please try again later." };
  }
}