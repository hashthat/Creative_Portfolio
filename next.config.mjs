import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProd = process.env.NODE_ENV === 'production';
const repoName = 'Creative_Portfolio';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}/` : '',
  reactStrictMode: false, // Disabled to prevent double-loading
  images: {
    unoptimized: true,
  },
  trailingSlash: true,

  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
      'lib': path.resolve(__dirname, 'common'),
      'three': path.resolve(__dirname, 'node_modules/three'),
    };
    return config;
  },
};

export default nextConfig;
