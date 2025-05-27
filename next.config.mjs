import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  compiler: {
    removeConsole: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'ijhhu279hm.ufs.sh',
        pathname: '/f/*',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Ensure that all imports of 'yjs' resolve to the same instance
      config.resolve.alias['yjs'] = path.resolve('node_modules/yjs');
    }
    return config;
  },
  serverExternalPackages: ['yjs'],
  experimental: {
    turbo: {},
    serverActions: {
      bodySizeLimit: '15mb',
    },
  },
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
