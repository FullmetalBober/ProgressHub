import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Ensure that all imports of 'yjs' resolve to the same instance
      config.resolve.alias['yjs'] = path.resolve('node_modules/yjs');
    }
    return config;
  },
  // experimental: { serverComponentsExternalPackages: ["yjs"] },
  async redirects() {
    return [
      {
        source: '/workspace',
        destination: '/',
        permanent: true,
      },
      {
        source: '/workspace/:workspaceId',
        destination: '/workspace/:workspaceId/issues',
        permanent: true,
      },
      {
        source: '/workspace/:workspaceId/settings',
        destination: '/workspace/:workspaceId/settings/general',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
