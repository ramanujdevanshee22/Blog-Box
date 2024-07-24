import Image from "next/image";
import Link from 'next/link';
import Feed from "../../public/images/feed.gif";
import NavBar from "../../components/NavBar";
import { VerifyAuth } from "../../lib/User";
import { redirect } from "next/navigation";

export default async function Home() {
  const result =  await VerifyAuth();

  //  console.log("User found at entry page",result.user)
    if(result.user){
      return redirect('/blogs');
    }
  return (
    <>
    
      <NavBar/>
    <div className="flex items-center justify-center bg-white overflow-hidden pt-8 font-WorkSans">
      <div className="flex flex-col lg:pt-5 md:flex-row items-center justify-between w-full max-w-6xl px-4">
        <div className="flex flex-col items-start max-w-md md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-PrimaryBlack mb-4">Welcome to BlogBox</h1>
          <p className="text-xl md:text-2xl text-zinc-400 mb-4">One-stop platform to unbox your stories!</p>
          <p className="text-xl md:text-2xl text-zinc-400 mb-8">Explore, Express, Engage.</p>
          <Link href="/blog" className="text-lg text-white bg-SecondaryPink hover:bg-SecondaryOrange px-6 py-3 rounded-full transition duration-300">
            
              Explore Blogs
           
          </Link>
        </div>
        <div className="mt-8 md:mt-0 md:ml-8">
          <Image src={Feed} alt="Welcome GIF" width={500} height={400} />
        </div>
      </div>
    </div>
    </>
  );
}
