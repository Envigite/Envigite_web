/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Desactivar la comprobación de ESLint durante la compilación
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig; 