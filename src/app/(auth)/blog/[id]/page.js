import React from "react";
import { notFound } from "next/navigation";
import { getParticularBlog } from "../../../../../lib/Blog";
import ParticularBlog from "../../../../../components/ParticularBlog";
import { VerifyAuth } from "../../../../../lib/User";

export default async function DynamincBlog({ params }) {
  const particularBlog = await getParticularBlog(params.id);

  // console.log("Frontend",particularBlog)
  if (!particularBlog) {
     notFound();
    return null;
  }

  const result = await VerifyAuth();
  // console.log(result.user,"User from particular blog page");
  const userId= result.user;
  
  return <ParticularBlog particularBlog={particularBlog} userId={userId}/>;
}
