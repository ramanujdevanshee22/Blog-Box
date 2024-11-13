"use server";
import { revalidatePath } from "next/cache";
import Blog from "../model/Blog";
import { connect } from "./connectDB";
import mongoose, { Mongoose } from "mongoose";

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
      return {
        warning: "Failed to connect to the database. Please try again later.",
      };
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
    revalidatePath("/blog");

    return { message: "Blog added successfully!" };
  } catch (error) {
    console.error("Error adding blog:", error);
    return { warning: "Failed to add blog. Please try again later." };
  }
}

export async function getblogs() {
  try {
    await connect();
  } catch (error) {
    console.error("Error connecting to the database:", error);
    return {
      warning: "Failed to connect to the database. Please try again later.",
    };
  }

  try {
    const blogs = await Blog.find()
      .populate("author_id", "username")
      .lean()
      .exec();

    // console.log("Backend blogs",blogs);
    return blogs;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return { warning: "Failed to fetch blogs. Please try again later." };
  }
}

export async function getParticularBlog(id) {
  try {
    await connect();
  } catch (error) {
    console.error("Error connecting to the database:", error);
    return {
      warning: "Failed to connect to the database. Please try again later.",
    };
  }

  try {
    const blog = await Blog.findById(id)
      .populate("author_id")
      .populate({
        path: "comments.user",
        select: "-password",
      })
      .lean()
      .exec();

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

export async function LikeHandler(postId, userId) {
  // console.log("Like Handler called",postId,userId.id);
  try {
    await connect();

    const post = await Blog.findById(postId).exec();

    if (!post) {
      return { warning: "Post not Found" };
    }

    const liked = post.likes.includes(userId.id);

    if (!post.likes.includes(userId.id)) {
      post.likes.push(userId.id);
    } else {
      post.likes = post.likes.filter((id) => id !== userId.id);
    }

    await post.save();

    revalidatePath("/blogs", "layout");
  } catch (error) {
    console.error("Error updating post likes:", error);
    return { warning: "Failed to update likes" };
  }
}

export async function CommentHandler(comment, postId, userId) {
  // console.log(userId.id);
  // console.log(comment, postId, userId.id);
  const userID = userId.id;

  try {
    await connect();

    const updatedBlog = await Blog.findByIdAndUpdate(
      postId,
      {
        $push: {
          comments: { text: comment, user: userID, date: new Date() },
        },
      },
      { new: true, projection: { comments: 1 } }
    )
      .populate({
        path: "comments.user",
        select: "username", // only select the username field from the User model
      })
      .lean()
      .exec();

    const updatedPlainBlog = JSON.parse(JSON.stringify(updatedBlog));
    revalidatePath(`/blogs/${postId}`);

    // console.log("Backend--",updatedPlainBlog.comments);
    return updatedPlainBlog.comments;
  } catch (e) {
    console.error(e);
  }
}

export async function DeleteCommentHandler(postId, commentId) {
  try {
    await connect();

    await Blog.findByIdAndUpdate(postId, {
      $pull: { comments: { _id: commentId } },
    }).exec();
    revalidatePath(`/blogs/${postId}`);
    // console.log("comment deleted")
  } catch (e) {
    console.error(e);
  }
}

export async function getMyBlogs(userId) {
  try {
    await connect();
  } catch (error) {
    console.error("Error connecting to the database:", error);
    return {
      warning: "Failed to connect to the database. Please try again later.",
    };
  }

  try {
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const blogs = await Blog.find({ author_id: userObjectId })
      .populate("author_id", "username")
      .lean()
      .exec();
    console.log(blogs);

    const plainAuthorsBlog = JSON.parse(JSON.stringify(blogs));
    console.log("2) Blogs from Bakcend", plainAuthorsBlog);
    return plainAuthorsBlog;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return { warning: "Failed to fetch blogs. Please try again later." };
  }
}

export async function deletePost(blogId, userId) {
  const Id_User = new mongoose.Types.ObjectId(userId);
  try {
    const deletedPost = await Blog.findOneAndDelete({
      _id: blogId,
      author_id: Id_User,
    });

    if (deletedPost) {
      console.log("Blog post deleted successfully:", deletedPost);
      revalidatePath("/myblogs");
      return { message: "Blog post deleted successfully" };
    } else {
      console.log("Blog post not found or you are not the author");
      return { warning: "Blog post not found or you are not the author" };
    }
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return { warning: "Error deleting blog post" };
  }
}
