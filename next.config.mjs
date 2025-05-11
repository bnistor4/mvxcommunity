/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // output: 'export', // Removed for server capabilities
  // distDir: 'dist', // Removed, defaults to .next
  // trailingSlash: true, // Temporarily remove for diagnosis
}

export default nextConfig
