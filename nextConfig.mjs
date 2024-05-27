// nextConfig.mjs

import { NextConfig } from 'next';

const nextConfig = {
  reactStrictMode: true, // Enables React's Strict Mode
  swcMinify: true, // Enables the SWC compiler for minification
  images: {
    domains: ['example.com'], // Allow images from these domains
  },
  i18n: {
    locales: ['en', 'fr', 'es'], // Supported languages
    defaultLocale: 'en', // Default language
  },
  webpack: (config, { isServer }) => {
    // Custom webpack configuration
    if (!isServer) {
      config.resolve.fallback.fs = false; // Avoid using 'fs' module on the client side
    }
    return config;
  },
};

export default nextConfig;
