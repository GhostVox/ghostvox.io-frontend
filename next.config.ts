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
      }, {
        // Add this new block for your virtual-hosted style URL
        protocol: 'https',
        hostname: 'ghostvox.io.s3.us-east-1.amazonaws.com',
        port: '',
        pathname: '/avatars/**',
      },
      {
        protocol: 'https',
        hostname: 's3.us-east-1.amazonaws.com',
        port: '',
        pathname: '/ghostvox.io/avatars/**',
      },],
  },
};

export default nextConfig;
