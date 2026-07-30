import { IHeader, IPage } from "@/@types/generated/contentful";
import Layout from "@/components/layout/Layout";
import { client } from "@/helpers/clinet";
import { GetStaticPaths, GetStaticProps } from "next";
import RenderContent from "@/components/renderContent/RenderContent";
import Metadata from "@/components/metadata/Metadata";
import {
  EN_HOME_SLUG,
  EN_PREFIX,
  HEADER_CONTENT_TYPE,
  PAGE_TYPE,
  PageProps,
} from "@/helpers/contentTypes";

// `/` ima svoju rutu (pages/sr.tsx), `en` i sve `en/...` strane idu kroz
// pages/en/[slug].tsx. Bez filtriranja `en/` prefiksa ova ruta bi probala da
// generise putanju sa kosom crtom unutar jednog [slug] segmenta.
export const RESERVED_PAGES = ["/", EN_HOME_SLUG];

const GeneralPage = ({ header, homepage }: PageProps) => {
  const contentSections = (homepage.fields as any)?.contentSections;

  return (
    <Layout links={(header.fields as any)?.headerLinks}>
      <Metadata
        title={(homepage.fields as any)?.seoTitle}
        description={(homepage.fields as any)?.seoDesctiption}
        path={(homepage.fields as any)?.slug ?? ""}
      />
      <RenderContent sections={contentSections} />
    </Layout>
  );
};

export default GeneralPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const pagesResponse = await client().getEntries({
    content_type: PAGE_TYPE,
    include: 1,
  });
  if (!pagesResponse.items.length)
    return {
      paths: [],
      fallback: false,
    };
  const pages: IPage[] = pagesResponse.items as IPage[];

  const slugs = pages
    .map((item) => (item.fields as any)?.slug)
    .filter(
      (slug) =>
        !RESERVED_PAGES.includes(slug || "") && !slug?.startsWith(EN_PREFIX)
    );

  const paths = slugs.map((slug) => ({
    params: { slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params, preview }) => {
  const { slug } = params as { slug: string };

  const response = await client().getEntries({
    content_type: HEADER_CONTENT_TYPE,
  });
  const homepageResponse = await client().getEntries({
    content_type: PAGE_TYPE,
    "fields.slug": slug,
    include: 10,
  });

  const header = response.items[0];
  const homepage = homepageResponse.items[0];

  return {
    props: {
      header,
      homepage,
    },
  };
};
