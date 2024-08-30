'use client';
import { toast } from "sonner";
import { deletePost } from "../lib/Blog";
import { useState } from "react";

export async function DeletePost({blogId, userId}) {

const [isModelOpen, setModelOpen]= useState(false);
const handleDelete = async (blogId) =>{
    const answer= await deletePost(blogId,userId);

    if(answer.message){
      toast.success(answer.message);
 
    }

    if(answer.warning){
      toast.error(answer.warning);
    }
}
  return (
    <>
    <button
      onClick={()=>setModelOpen(true)}
      className="text-red-500  hover:bg-red-100 rounded-md p-2 mt-8 ml-5 inline-block"
      >
      Delete Post
    </button>

    {isModelOpen && <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white p-7 rounded-md shadow-md">
        <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
        <p>Are you sure you want to delete this post?</p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={()=>setModelOpen(false)}
            className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md mr-2"
            >
            Cancel
          </button>
          <button
            onClick={()=>handleDelete(blogId)}
            className="bg-red-500 text-white py-2 px-4 rounded-md"
            >
            Delete
          </button>
        </div>
      </div>
    </div>}
            </>
  );
}
