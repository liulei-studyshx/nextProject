import type { NextConfig } from "next";
const path = require('path');
const withLess = require('next-with-less');
const nextConfig: NextConfig = withLess({
  experimental: {
    turbo: true,
  },
  lessLoaderOptions: {
    lessOptions: {
      javascriptEnabled: true,
    },
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  /* config options here */
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    config.resolve.alias={
      ...config.resolve.alias,
      '@': path.join(__dirname, 'src'),
      '@common': path.join(__dirname, 'src/common')
    }
    return config;
  },
});

export default nextConfig;
