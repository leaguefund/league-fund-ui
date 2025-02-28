/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'www.figma.com',
      'sleepercdn.com',
      'avatars.githubusercontent.com',
      'mir-s3-cdn-cf.behance.net',
      'preview.redd.it',
      'img.freepik.com',
      'cdn4.vectorstock.com',
      'oaidalleapiprodscus.blob.core.windows.net',
      's3.amazonaws.com',
      's3-us-west-1.amazonaws.com',
      's3-us-west-2.amazonaws.com',
      's3-us-east-1.amazonaws.com',
      's3-us-east-2.amazonaws.com',
      's3.us-west-1.amazonaws.com',
      's3.us-west-2.amazonaws.com',
      's3.us-east-1.amazonaws.com',
      's3.us-east-2.amazonaws.com',
      'd1.awsstatic.com',
      'd2.awsstatic.com',
      'd3.awsstatic.com',
      'cloudfront.net',
      'd1cdn.aws.com',
      'd2cdn.aws.com',
      'd3cdn.aws.com'
    ],
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