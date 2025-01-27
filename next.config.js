/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "salmon-petite-mule-446.mypinata.cloud",
      },
    ],
  },
};

module.exports = nextConfig;
