/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_VAPI_API_KEY: process.env.NEXT_PUBLIC_VAPI_API_KEY,
        AWS_REGION: process.env.AWS_REGION,
        AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
        AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
        AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
        SERVER_URL: process.env.SERVER_URL,
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'donotfail.s3.amazonaws.com',
            port: '',
            // pathname: '/account123/**',
          },
        ],
      },
};

export default nextConfig;
