import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProd = process.env.NODE_ENV === 'production';
const repoName = 'Creative_Portfolio';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // Enhanced basePath handling
  basePath: isProd ? `/${repoName}` : '',
  // Improved assetPrefix with protocol-relative URL
  assetPrefix: isProd ? `/${repoName}/` : '',
  // Optional: Disable strict mode if you're seeing double-mounting issues
  reactStrictMode: false, // Changed from true to prevent double loads
  images: {
    unoptimized: true,
  },
  // Added explicit production browser caching
  trailingSlash: true,
  productionBrowserSourceMaps: false, // Better for performance
  // Added compression for static exports
  compress: true,

  webpack: (config, { isServer }) => {
    // Enhanced alias configuration
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
      'lib': path.resolve(__dirname, 'common'),
      // Add this to prevent three.js duplicate module issues
      'three': path.resolve(__dirname, 'node_modules/three'),
    };
    
    // Important for GLB loader
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: isProd ? `/${repoName}/_next/static` : '/_next/static',
          outputPath: 'static/',
          name: '[name].[hash].[ext]',
        },
      },
    });

    return config;
  },
};

export default nextConfig;
