import { redirect } from "next/navigation";
import { VerifyAuth } from "../../../../lib/User";
import { getblogs } from "../../../../lib/Blog";
import AllBlogs from "../../../../components/AllBlogs";


export default async function BlogPage() {
  const result = await VerifyAuth();

  if (!result.user) {
    return redirect("/");
  }

  let blogs = await getblogs();

  if (blogs.warning) {
    toast.error(blogs.warning);
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-8 p-4 rounded">
        <div className="text-SecondaryPink text-4xl font-bold">
          ⚠️ No Blogs!
        </div>
        <p className="text-gray-600 mt-2 animate-pulse text-lg">
          Try adding some...
        </p>
      </div>
    );
  }

 
  return <AllBlogs blogs={blogs}/>
}
