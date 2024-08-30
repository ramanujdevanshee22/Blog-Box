import Link from "next/link";

export default function NotFound() {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg mt-32">
          <div className="text-SecondaryPink text-5xl font-bold mb-4">
            ⚠️ Blogs Not Found!
          </div>
          <p className="text-gray-500 text-lg mb-4">
            You have not yet published any blog. Try posting one!
          </p>
          <Link href="/" className="text-SecondaryPurple hover:text-white rounded-md p-2 hover:bg-SecondaryPurple text-lg mr-2">
            Go back to Blogs
          </Link>
          <Link href="/publish" className="text-SecondaryPurple hover:text-white rounded-md p-2 hover:bg-SecondaryPurple  text-lg">
            Publish Blog
          </Link>
        </div>
      </div>
    );
  }
