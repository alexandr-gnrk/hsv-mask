/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",  // Enables static exports
  basePath: "/hsv-mask", // Replace with your repository name
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
