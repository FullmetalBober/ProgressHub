/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/workspace/:workspaceId',
        destination: '/workspace/:workspaceId/issues',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
