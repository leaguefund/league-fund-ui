/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['www.figma.com', 'sleepercdn.com', 'avatars.githubusercontent.com', 'mir-s3-cdn-cf.behance.net', 'preview.redd.it', 'img.freepik.com', 'cdn4.vectorstock.com'],
  },
  webpack(config) {
    // SVG Configuration
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
}

module.exports = nextConfig 