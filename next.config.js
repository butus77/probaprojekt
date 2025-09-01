/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.api.bookcreator.com",
      },
    ],
  },
};

export default nextConfig;
