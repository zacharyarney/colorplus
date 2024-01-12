/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Outputs a Single-Page Application (SPA).
  distDir: './dist', // Changes the build output directory to `./dist/`.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH, // Sets the base path for the application.
  experimental: {
    outputFileTracingIncludes: {

    }
  }
};

export default nextConfig;
