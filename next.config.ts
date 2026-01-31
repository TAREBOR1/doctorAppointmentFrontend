import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dkg6vgwit/image/upload/**",
      },
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
        pathname: "/dkg6vgwit/image/upload/**",
      },
    ],
  },
};

export default nextConfig;
