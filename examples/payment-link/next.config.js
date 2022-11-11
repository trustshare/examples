const env = require('../../.env');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  env,
};

const withTM = require('next-transpile-modules')(['@package/components']);

module.exports = withTM(nextConfig);
