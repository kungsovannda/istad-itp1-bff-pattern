import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "images.unsplash.com",
      "cdn.pixabay.com",
      "i.pinimg.com",
      "cdn.dummyjson.com",
      "i.imgur.com",
    ],
  },
};

export default nextConfig;
