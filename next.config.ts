import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ Ensure PDFKit is bundled for the server
  serverExternalPackages: ["pdfkit"],

  // Optional for dev
  reactStrictMode: true,
};

export default nextConfig;
