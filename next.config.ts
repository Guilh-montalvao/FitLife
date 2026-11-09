import type { NextConfig } from 'next';
const config: NextConfig = { output: 'export', allowedDevOrigins: ['terminal.local'], trailingSlash: true, images: { unoptimized: true }, devIndicators: false };
export default config;
