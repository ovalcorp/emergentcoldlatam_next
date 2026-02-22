import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* creando proxy para el backend */
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:8000/api/:path*',
      },
    ];
  },
};

export default nextConfig;
