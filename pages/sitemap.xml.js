import { client } from "../helpers/clinet";

const PAGE_TYPE = "page";
const EN_HOME_SLUG = "en";
const EN_PREFIX = "en/";

const SITE_URL = (
  process.env.SITEMAP_URL || "https://www.copywritingbyslavisa.com"
).replace(/\/+$/, "");

function generateSiteMap(urls) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url}</loc>
  </url>`
  )
  .join("\n")}
</urlset>
`;
}

function SiteMap() {
  // getServerSideProps radi sav posao
}

export async function getServerSideProps({ res }) {
  const pagesResponse = await client().getEntries({
    content_type: PAGE_TYPE,
    include: 1,
  });

  const slugs = pagesResponse.items
    .map((item) => item.fields?.slug)
    .filter(Boolean);

  // Sajt je presao na englesku verziju. U sitemap ide samo engleski sadrzaj —
  // srpske strane su i dalje dostupne, ali se ne prijavljuju Googlu da se ne
  // takmice sa engleskim za isti domen.
  const urls = [
    `${SITE_URL}/`,
    ...slugs
      .filter((slug) => slug.startsWith(EN_PREFIX) && slug !== EN_HOME_SLUG)
      .map((slug) => `${SITE_URL}/${slug}`),
  ];

  res.setHeader("Content-Type", "text/xml");
  res.write(generateSiteMap(urls));
  res.end();

  return { props: {} };
}

export default SiteMap;
