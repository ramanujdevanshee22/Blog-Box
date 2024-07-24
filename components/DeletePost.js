'use client'
export default function DeletePost() {
const handleDelete = async (blogId) =>{
    
}
  return (
    <button
      onClick={() => handleDelete(blog._id)}
      className="text-red-500  hover:bg-red-100 rounded-md p-2 mt-8 ml-5 inline-block"
    >
      Delete Post
    </button>
  );
}
