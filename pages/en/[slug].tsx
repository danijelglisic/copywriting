import { IPage } from "@/@types/generated/contentful";
import Layout from "@/components/layout/Layout";
import { client } from "@/helpers/clinet";
import { GetStaticPaths, GetStaticProps } from "next";
import RenderContent from "@/components/renderContent/RenderContent";
import Metadata from "@/components/metadata/Metadata";
import { RedesignPreviewLayout } from "../redesign-concepts";
import {
  EN_HOME_SLUG,
  EN_PREFIX,
  PAGE_TYPE,
  PageProps,
} from "@/helpers/contentTypes";

const EnglishPage = ({ homepage }: PageProps) => {
  const contentSections = (homepage?.fields as any)?.contentSections;
  const isPortfolio = (homepage?.fields as any)?.slug === "en/portfolio";
  const PageLayout = isPortfolio ? RedesignPreviewLayout : Layout;

  return (
    <PageLayout>
      <Metadata
        title={(homepage?.fields as any)?.seoTitle ?? "Slaviša Bogdanović"}
        description={(homepage?.fields as any)?.seoDesctiption ?? ""}
        path={(homepage?.fields as any)?.slug ?? ""}
      />
      {contentSections && (
        <div
          className={
            isPortfolio
              ? "[&_.z-section-visual]:relative [&_.z-section-visual]:overflow-hidden [&_.z-section-visual]:rounded-[1.75rem] [&_.z-section-visual]:border [&_.z-section-visual]:border-navy/10 [&_.z-section-visual]:bg-white [&_.z-section-visual]:p-2 [&_.z-section-visual]:shadow-[0_14px_34px_rgba(10,31,68,0.08)] [&_.z-section-visual]:transition [&_.z-section-visual]:duration-300 [&_.z-section-visual]:hover:-translate-y-1 [&_.z-section-image]:h-auto [&_.z-section-image]:w-full [&_.z-section-image]:rounded-[1.35rem] [&>div>div:nth-child(1)]:!bg-[#F9F9F7] [&>div>div:nth-child(1)]:!text-dark [&>div>div:nth-child(2)]:!bg-white [&>div>div:nth-child(3)]:!bg-[#F9F9F7] [&>div>div:nth-child(3)]:!text-dark [&>div>div:nth-child(4)]:!bg-white"
              : undefined
          }
        >
          <RenderContent sections={contentSections} />
        </div>
      )}
    </PageLayout>
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
