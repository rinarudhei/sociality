import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  devIndicators: false,
  staticPageGenerationTimeout: 600,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '**' },
    ],
  },
};

export default nextConfig;
