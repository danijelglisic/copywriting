import { IHeader, ILandingSection, IPage } from "@/@types/generated/contentful";
import Layout from "@/components/layout/Layout";
import { client } from "@/helpers/clinet";
import { GetStaticProps } from "next";
import HeroSection from "@/components/heroSection/HeroSection";
import RenderContent from "@/components/renderContent/RenderContent";
import Metadata from "@/components/metadata/Metadata";

export const HEADER_CONTENT_TYPE = "header";
export const LANDING_SECTION_TYPE = "landingSection";
export const PAGE_TYPE = "page";

export const RESERVED_PAGES = ["/"];

export interface PageProps {
  header: IHeader;
  homepage: IPage;
}

const Home = ({ header, homepage }: PageProps) => {
  const contentSections = (homepage.fields as any)?.contentSections;

  return (
    <Layout links={(header.fields as any)?.headerLinks}>
      <Metadata
        title={(homepage.fields as any)?.seoTitle}
        description={(homepage.fields as any)?.seoDesctiption}
        path=""
      />
      <RenderContent sections={contentSections} />
    </Layout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<any> = async (context) => {
  const response = await client().getEntries({
    content_type: HEADER_CONTENT_TYPE,
  });
  const landingSectionResponse = await client().getEntries({
    content_type: LANDING_SECTION_TYPE,
  });

  const homepageResponse = await client().getEntries({
    content_type: PAGE_TYPE,
    "fields.slug": "/",
    include: 10,
  });

  const header = response.items[0];
  const landingSection = landingSectionResponse.items[0];
  const homepage = homepageResponse.items[0];

  return {
    props: {
      header,
      landingSection,
      homepage,
    },
  };
};
