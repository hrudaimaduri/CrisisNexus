/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
  transpilePackages: ['leaflet'],
  experimental: {
    optimizeCss: true
  }
};

module.exports = nextConfig; 