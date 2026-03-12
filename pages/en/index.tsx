import { IHeader, IPage } from "@/@types/generated/contentful";
import Layout from "@/components/layout/Layout";
import { client } from "@/helpers/clinet";
import { GetStaticProps } from "next";
import RenderContent from "@/components/renderContent/RenderContent";
import Metadata from "@/components/metadata/Metadata";
import { HEADER_CONTENT_TYPE, PAGE_TYPE } from "../index";

interface EnglishPageProps {
  header: IHeader;
  homepage: IPage;
}

const EnglishHome = ({ header, homepage }: EnglishPageProps) => {
  const contentSections = (homepage?.fields as any)?.contentSections;

  return (
    <Layout links={(header.fields as any)?.headerLinks} isEnglish>
      <Metadata
        title={(homepage?.fields as any)?.seoTitle ?? "Slaviša Bogdanović"}
        description={(homepage?.fields as any)?.seoDesctiption ?? ""}
        path="en"
      />
      {contentSections && <RenderContent sections={contentSections} />}
    </Layout>
  );
};

export default EnglishHome;

export const getStaticProps: GetStaticProps<any> = async () => {
  const response = await client().getEntries({
    content_type: HEADER_CONTENT_TYPE,
  });

  const homepageResponse = await client().getEntries({
    content_type: PAGE_TYPE,
    "fields.slug": "en",
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
