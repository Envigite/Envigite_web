/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Desactivar la comprobación de ESLint durante la compilación
    ignoreDuringBuilds: true,
  },
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig;
