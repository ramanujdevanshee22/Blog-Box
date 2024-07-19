export default function NotFound() {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg mt-32">
          <div className="text-SecondaryPink text-5xl font-bold mb-4">
            ⚠️ Blog Not Found!
          </div>
          <p className="text-gray-500 text-lg mb-4">
            The blog post you're looking for does not exist. It might have been removed or the link might be incorrect.
          </p>
          <a href="/" className="text-SecondaryPurple hover:text-white rounded-md p-2 hover:bg-SecondaryPurple  text-lg">
            Go back to Blogs
          </a>
        </div>
      </div>
    );
  }
