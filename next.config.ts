import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "rc-util",
    "rc-picker",
    "rc-pagination",
    "rc-tree",
    "rc-table",
    "@ant-design/icons-svg",
  ],
};

export default nextConfig;
