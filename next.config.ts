import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow loading images directly from production buymyhouse.co WordPress site
    remotePatterns: [
      {
        protocol: "https",
        hostname: "buymyhouse.co",
        pathname: "/wp-content/**",
      },
    ],
  },
};

export default nextConfig;
