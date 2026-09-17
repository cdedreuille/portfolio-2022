/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Next defaults this to [75] and rejects any other value with a 400.
    qualities: [75, 90, 100],
  },
};

module.exports = nextConfig;
