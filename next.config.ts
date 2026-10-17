import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      // Seeded product/category images (server/prisma/seed.js)
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      // Product images uploaded to the Express backend (UPLOAD_DIR / PUBLIC_URL)
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/**',
      },
    ],
    // Next 16 blocks optimizing images from local IPs; the dev backend runs on localhost.
    dangerouslyAllowLocalIP: process.env.NODE_ENV !== 'production',
  },
};

export default nextConfig;
