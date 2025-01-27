import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "salmon-petite-mule-446.mypinata.cloud",
        port: "",
      },
    ],
  },
};

export default nextConfig;
