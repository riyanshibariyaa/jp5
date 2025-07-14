/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  basePath: '/jobportal', 
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
