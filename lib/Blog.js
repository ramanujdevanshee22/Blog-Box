"use server";
import { revalidatePath } from "next/cache";
import Blog from "../model/Blog";
import { connect } from "./connectDB";
import { notFound } from "next/navigation";



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
    revalidatePath('/blog')

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
    const blogs = await Blog.find()
  .populate('author_id', 'username')
  .populate({
    path: 'comments',
    populate: {
      path: 'user',
      select: 'username'
    }
  })
  .exec();
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
    const blog = await Blog.findById(id).populate('author_id', 'username').lean().exec();
    // console.log(blog);
    if (!blog) {
      return null;
    }
    const plainBlog = JSON.parse(JSON.stringify(blog));

    return plainBlog;

  } catch (error) {
    console.error("Error fetching blog: ", error);
    // return { warning: "Failed to fetch blog. Please try again later." };
    return null;
  }
}


export async function LikeHandler(postId, userId){
  // console.log("Like Handler called",postId,userId.id);
  try{
    await connect();

    const post = await Blog.findById(postId).exec();

    if(!post){
      return {warning:"Post not Found"}
    }
  
    const liked = post.likes.includes(userId.id);
  
    if (!post.likes.includes(userId.id)) {
      post.likes.push(userId.id); 
    } else {
      post.likes = post.likes.filter(id => id !== userId.id);
    }
  
    await post.save();

    revalidatePath("/blog",'layout');

  }catch(error){
    console.error("Error updating post likes:", error);
    return { warning: "Failed to update likes" };
  }
 

}

export async function CommentHandler(postId,userId, formData){
  // console.log(userId.id);
  // console.log(formData.get("comment"));

  const comment = formData.get("comment");
  const userID = userId.id;

  try{
    await connect();

    const post = await Blog.findById(postId).exec();

    if (post) {
      post.comments.push({ text: comment, user: userID, date: new Date() });

    }
    await post.save(); 

  } catch (e) {
    console.error(e);
  }
}
