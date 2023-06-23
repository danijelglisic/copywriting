import { client } from "../helpers/clinet";
const PAGE_TYPE = "page";

function generateSiteMap(slugs) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${slugs
       .map((slug) => {
         return `
       <url>
           <loc>${`${process.env.SITEMAP_URL}/${slug}`}</loc>
       </url>
     `;
       })
       .join("")}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  const pagesResponse = await client().getEntries({
    content_type: PAGE_TYPE,
    include: 1,
  });
  const pages = pagesResponse.items;

  const slugs = pages.map((item) => item.fields.slug);

  // We generate the XML sitemap with the slugs
  const sitemap = generateSiteMap(slugs);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
