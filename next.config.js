/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: process.cwd(),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
      },
    ],
    unoptimized: process.env.NODE_ENV === 'production',
  },
  async redirects() {
    return [
      // Engleska pocetna je presla na root. /en je vec bio indeksiran, pa ide
      // trajni redirect da Google ne vidi dve strane sa istim sadrzajem.
      { source: "/en", destination: "/", permanent: true },
    ];
  },
};

module.exports = nextConfig;
