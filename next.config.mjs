/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  experimental: {
    esmExternals: "loose",
  },
};

export default nextConfig;
