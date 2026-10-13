import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export',  <-- 이 옵션이 켜져 있으면 동적 경로([city], [district])가 정적 빌드되지 못해 404가 나거나 홈으로 튑니다.
};

export default nextConfig;