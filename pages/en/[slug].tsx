import { IPage } from "@/@types/generated/contentful";
import Layout from "@/components/layout/Layout";
import { client } from "@/helpers/clinet";
import { GetStaticPaths, GetStaticProps } from "next";
import RenderContent from "@/components/renderContent/RenderContent";
import Metadata from "@/components/metadata/Metadata";
import {
  EN_HOME_SLUG,
  EN_PREFIX,
  PAGE_TYPE,
  PageProps,
} from "@/helpers/contentTypes";

const EnglishPage = ({ homepage }: PageProps) => {
  const contentSections = (homepage?.fields as any)?.contentSections;
  const isPortfolio = (homepage?.fields as any)?.slug === "en/portfolio";

  return (
    <Layout>
      <Metadata
        title={(homepage?.fields as any)?.seoTitle ?? "Slaviša Bogdanović"}
        description={(homepage?.fields as any)?.seoDesctiption ?? ""}
        path={(homepage?.fields as any)?.slug ?? ""}
      />
      {contentSections && (
        <div
          className={
            isPortfolio
              ? "[&>div>div:nth-child(odd)]:!bg-[#F9F9F7] [&>div>div:nth-child(even)]:!bg-white"
              : undefined
          }
        >
          <RenderContent sections={contentSections} />
        </div>
      )}
    </Layout>
  );
};

export default EnglishPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const pagesResponse = await client().getEntries({
    content_type: PAGE_TYPE,
    include: 1,
  });

  if (!pagesResponse.items.length) return { paths: [], fallback: false };

  const pages: IPage[] = pagesResponse.items as IPage[];

  const slugs = pages
    .map((item) => (item.fields as any)?.slug as string)
    .filter((slug) => slug?.startsWith(EN_PREFIX) && slug !== EN_HOME_SLUG)
    .map((slug) => slug.replace(EN_PREFIX, ""));

  const paths = slugs.map((slug) => ({
    params: { slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };

  const homepageResponse = await client().getEntries({
    content_type: PAGE_TYPE,
    "fields.slug": `en/${slug}`,
    include: 10,
  });

  return {
    props: {
      homepage: homepageResponse.items[0] ?? null,
    },
  };
};
