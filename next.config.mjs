import path from 'path';
import { fileURLToPath } from 'url';

// Define __dirname equivalent for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: '/Creative_Portfolio',
  assetPrefix: '/Creative_Portfolio/',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,

  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@App': path.resolve(__dirname, 'src'),
      'lib': path.resolve(__dirname, 'common'),
    };
    return config;
  },
};

export default nextConfig;
