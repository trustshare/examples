/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
};

const withTM = require('next-transpile-modules')(['@package/components']);

module.exports = withTM(nextConfig);
