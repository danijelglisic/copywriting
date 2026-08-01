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

      // Sajt je sada samo na engleskom. Srpske rute su uklonjene iz koda, ali
      // su bile indeksirane i Google ih je i dalje prikazivao — vadjenje iz
      // menija i sitemapa ne govori Googlu nista. Trajni redirect je jedini
      // signal koji ih stvarno sklanja.
      { source: "/sr", destination: "/", permanent: true },
      { source: "/o-meni", destination: "/en/portfolio", permanent: true },
      { source: "/usluge", destination: "/en/video-ads", permanent: true },
      { source: "/kontakt", destination: "/en/contact", permanent: true },
      {
        source: "/politika-privatnosti",
        destination: "/en/privacy-policy",
        permanent: true,
      },
      {
        source: "/uslovi-koriscenja-sajta",
        destination: "/en/terms-of-use",
        permanent: true,
      },

      // Bez engleskog parnjaka — idu na pocetnu.
      { source: "/copywriting-kurs", destination: "/", permanent: true },
      { source: "/blog", destination: "/", permanent: true },
      { source: "/blog/:slug*", destination: "/", permanent: true },
    ];
  },
};

module.exports = nextConfig;
