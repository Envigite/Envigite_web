import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true, // <--- Desactiva la optimización de imágenes
  },
};

module.exports = nextConfig;