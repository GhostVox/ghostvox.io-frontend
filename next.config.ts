import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devServer: {
    https: {
      cert: process.env.SSL_CERT_FILE,
      key: process.env.SSL_KEY_FILE,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
