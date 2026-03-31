/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === 'development';

const nextConfig = {
  // In dev mode, omit `output: 'export'` so the /api/save-draft route works for the edit toolbar.
  // Production builds still generate a fully static export for GitHub Pages.
  output: isDev ? undefined : 'export',
  basePath: '/stape-website',
  env: {
    NEXT_PUBLIC_BASE_PATH: '/stape-website',
  },
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

module.exports = nextConfig
