/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["image.tmdb.org"], // ✅ allow TMDB images
  },
};

module.exports = nextConfig;
