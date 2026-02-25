import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* creando proxy para el backend */
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
      },
    ];
  },
};

