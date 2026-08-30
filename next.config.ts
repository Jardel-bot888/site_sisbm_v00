import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Formats modernes (WebP / AVIF) servis automatiquement selon le navigateur
    formats: ["image/avif", "image/webp"],
    // Tailles generees par l`optimiseur (évite images surdimensionnees)
    deviceSizes: [384, 426, 500, 600, 768, 1024, 1366, 1600],
    imageSizes: [16, 32, 48, 64, 96, 128, 192, 256],
    // Cache navigateur des images optimisees
    minimumCacheTTL: 60,
  },
  // Compression GZIP/Brotli (améliore le LCP)
  compress: true,
  // nodemailer doit rester externe au bundle serveur (module natif & dynamic import)
  serverExternalPackages: ["nodemailer"],
  // Ne pas exposer la techno serveur (léger gain de surface)
  poweredByHeader: false,
};

export default nextConfig;

