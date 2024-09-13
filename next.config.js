/** @type {import('next').NextConfig} */

const withNextIntl = require('next-intl/plugin')('./app/libs/i18n.ts');

const nextConfig = withNextIntl({
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.PROXY_BACKEND}/:path*`, // Proxy to Backend
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    disableStaticImages: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'thumbnail.voicetube.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
      {
        protocol: 'https',
        hostname: 'nmd-srt.s3.amazonaws.com',
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },
  output: 'standalone',
  trailingSlash: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
});

module.exports = nextConfig;
