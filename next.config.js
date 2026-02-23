const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: path.join(__dirname, '..'),
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'www.svgrepo.com' },
      { protocol: 'https', hostname: 'placehold.co' },
    ],
  },
};

module.exports = nextConfig;
