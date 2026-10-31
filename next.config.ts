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
      ...(process.env.NODE_ENV !== 'production'
        ? [{ protocol: 'http' as const, hostname: 'localhost', port: '5000', pathname: '/uploads/**' }]
        : []),
    ],
    // Next 16 blocks optimizing images from local IPs; the dev backend runs on localhost.
    dangerouslyAllowLocalIP: process.env.NODE_ENV !== 'production',
  },
  poweredByHeader: false,
  // Baseline security headers on every route.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
    ];
  },
};

export default nextConfig;
