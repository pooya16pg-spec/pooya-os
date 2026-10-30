/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  eslint: {
    // نادیده گرفتن خطاهای گرامری موقع بیلد
    ignoreDuringBuilds: true,
  },
  typescript: {
    // نادیده گرفتن خطاهای تایپ‌سکریپت موقع بیلد
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;