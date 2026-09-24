/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hrqxtwqgkuljmyfbiohl.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/cabin-images/**',
      },
      {
        protocol: 'https',
        hostname: 'flags.restcountries.com',
        port: '',
        pathname: '/v5/w640/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // output: 'export',
};

export default nextConfig;
