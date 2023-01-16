/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: false,
  },
  images: {
    domains: ["cdn.sanity.io"],
  },
};

module.exports = nextConfig;
