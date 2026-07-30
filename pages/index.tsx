import Layout from "@/components/layout/Layout";
import { client } from "@/helpers/clinet";
import { GetStaticProps } from "next";
import RenderContent from "@/components/renderContent/RenderContent";
import Metadata from "@/components/metadata/Metadata";
import {
  EN_HOME_SLUG,
  HEADER_CONTENT_TYPE,
  PAGE_TYPE,
  PageProps,
} from "@/helpers/contentTypes";

// Root sluzi englesku pocetnu stranu. Srpska pocetna je na /sr.
const Home = ({ header, homepage }: PageProps) => {
  const contentSections = (homepage?.fields as any)?.contentSections;

  return (
    <Layout links={(header.fields as any)?.headerLinks} isEnglish>
      <Metadata
        title={(homepage?.fields as any)?.seoTitle ?? "Slaviša Bogdanović"}
        description={(homepage?.fields as any)?.seoDesctiption ?? ""}
        path=""
      />
      {contentSections && <RenderContent sections={contentSections} />}
    </Layout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<any> = async () => {
  const response = await client().getEntries({
    content_type: HEADER_CONTENT_TYPE,
  });

  const homepageResponse = await client().getEntries({
    content_type: PAGE_TYPE,
    "fields.slug": EN_HOME_SLUG,
    include: 10,
  });

  return {
    props: {
      header: response.items[0],
      homepage: homepageResponse.items[0] ?? null,
    },
  };
};
