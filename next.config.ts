import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* output: 'export', */
  trailingSlash: true,
  images: {
    domains: ['media.giphy.com'], // Aquí agregas el dominio permitido
  },
};

module.exports = nextConfig;