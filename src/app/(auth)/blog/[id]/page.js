import React from "react";
import { notFound } from "next/navigation";
import { getParticularBlog } from "../../../../../lib/Blog";
import ParticularBlog from "../../../../../components/ParticularBlog";

export default async function DynamincBlog({ params }) {
  const particularBlog = await getParticularBlog(params.id);

  if (!particularBlog) {
    notFound();
  }

  return <ParticularBlog particularBlog={particularBlog} />;
}
