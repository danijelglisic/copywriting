import { IHeader, IPage } from "@/@types/generated/contentful";
import Layout from "@/components/layout/Layout";
import { client } from "@/helpers/clinet";
import { GetStaticPaths, GetStaticProps } from "next";
import RenderContent from "@/components/renderContent/RenderContent";
import Metadata from "@/components/metadata/Metadata";
import { HEADER_CONTENT_TYPE, PAGE_TYPE, PageProps } from ".";

export const RESERVED_PAGES = ["/"];

const GeneralPage = ({ header, homepage }: PageProps) => {
  const { contentSections } = homepage.fields;

  return (
    <Layout links={header.fields?.headerLinks}>
      <Metadata
        title={homepage.fields?.seoTitle}
        description={homepage.fields.seoDesctiption}
        path={homepage.fields.slug ?? ""}
      />
      <RenderContent sections={contentSections} />
    </Layout>
  );
};

export default GeneralPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const pagesResponse = await client().getEntries<any>({
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
    .map((item) => item.fields.slug)
    .filter((slug) => !RESERVED_PAGES.includes(slug || ""));

  const paths = slugs.map((slug) => ({
    params: { slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params, preview }) => {
  const { slug } = params as { slug: string };

  const response = await client().getEntries<IHeader>({
    content_type: HEADER_CONTENT_TYPE,
  });
  const homepageResponse = await client().getEntries<IPage>({
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
