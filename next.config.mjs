/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
     ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nurizrltdlbm6szw.public.blob.vercel-storage.com',
        port: '',
      },
    ],
  },
};

export default nextConfig;
