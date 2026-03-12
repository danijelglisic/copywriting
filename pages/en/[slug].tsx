import { IHeader, IPage } from "@/@types/generated/contentful";
import Layout from "@/components/layout/Layout";
import { client } from "@/helpers/clinet";
import { GetStaticPaths, GetStaticProps } from "next";
import RenderContent from "@/components/renderContent/RenderContent";
import Metadata from "@/components/metadata/Metadata";
import { HEADER_CONTENT_TYPE, PAGE_TYPE, PageProps } from "../index";

const EnglishPage = ({ header, homepage }: PageProps) => {
  const contentSections = (homepage?.fields as any)?.contentSections;

  return (
    <Layout links={(header.fields as any)?.headerLinks} isEnglish>
      <Metadata
        title={(homepage?.fields as any)?.seoTitle ?? "Slaviša Bogdanović"}
        description={(homepage?.fields as any)?.seoDesctiption ?? ""}
        path={(homepage?.fields as any)?.slug ?? ""}
      />
      {contentSections && <RenderContent sections={contentSections} />}
    </Layout>
  );
};

export default EnglishPage;

const EN_PREFIX = "en/";

export const getStaticPaths: GetStaticPaths = async () => {
  const pagesResponse = await client().getEntries({
    content_type: PAGE_TYPE,
    include: 1,
  });

  if (!pagesResponse.items.length)
    return { paths: [], fallback: false };

  const pages: IPage[] = pagesResponse.items as IPage[];

  const slugs = pages
    .map((item) => (item.fields as any)?.slug as string)
    .filter((slug) => slug?.startsWith(EN_PREFIX) && slug !== "en")
    .map((slug) => slug.replace(EN_PREFIX, ""));

  const paths = slugs.map((slug) => ({
    params: { slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };

  const response = await client().getEntries({
    content_type: HEADER_CONTENT_TYPE,
  });

  const homepageResponse = await client().getEntries({
    content_type: PAGE_TYPE,
    "fields.slug": `en/${slug}`,
    include: 10,
  });

  const header = response.items[0];
  const homepage = homepageResponse.items[0] ?? null;

  return {
    props: {
      header,
      homepage,
    },
  };
};
