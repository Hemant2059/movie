import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // domains: ["image.tmdb.org"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/t/p/**",
      },
    ],
  },
};

export default nextConfig;
