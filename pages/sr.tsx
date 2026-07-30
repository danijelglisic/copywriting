import Layout from "@/components/layout/Layout";
import { client } from "@/helpers/clinet";
import { GetStaticProps } from "next";
import RenderContent from "@/components/renderContent/RenderContent";
import Metadata from "@/components/metadata/Metadata";
import {
  HEADER_CONTENT_TYPE,
  PAGE_TYPE,
  PageProps,
} from "@/helpers/contentTypes";

// Srpska pocetna strana. Sajt je presao na englesku verziju, pa root sluzi
// engleski sadrzaj — srpski ostaje dostupan na /sr, ali nije u navigaciji.
const SerbianHome = ({ header, homepage }: PageProps) => {
  const contentSections = (homepage?.fields as any)?.contentSections;

  return (
    <Layout links={(header.fields as any)?.headerLinks}>
      <Metadata
        title={(homepage?.fields as any)?.seoTitle}
        description={(homepage?.fields as any)?.seoDesctiption}
        path="sr"
      />
      {contentSections && <RenderContent sections={contentSections} />}
    </Layout>
  );
};

export default SerbianHome;

export const getStaticProps: GetStaticProps<any> = async () => {
  const response = await client().getEntries({
    content_type: HEADER_CONTENT_TYPE,
  });

  const homepageResponse = await client().getEntries({
    content_type: PAGE_TYPE,
    "fields.slug": "/",
    include: 10,
  });

  return {
    props: {
      header: response.items[0],
      homepage: homepageResponse.items[0] ?? null,
    },
  };
};
