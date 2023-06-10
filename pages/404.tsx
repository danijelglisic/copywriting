import { IHeader } from "@/@types/generated/contentful";
import Layout from "@/components/layout/Layout";
import { client } from "@/helpers/clinet";
import { GetStaticProps } from "next";
import Metadata from "@/components/metadata/Metadata";
import HeroSection from "@/components/heroSection/HeroSection";

export const HEADER_CONTENT_TYPE = "header";
export const LANDING_SECTION_TYPE = "landingSection";
export const PAGE_TYPE = "page";

export const RESERVED_PAGES = ["/"];

export interface PageProps {
  header: IHeader;
}

const Home = ({ header }: PageProps) => {
  return (
    <Layout links={header.fields?.headerLinks}>
      <Metadata
        title={"Nije pronađeno | Greška 404 | Stranica ne postoji"}
        description={"Tražena stranica ne postoji."}
      />
      <HeroSection
        heading="Greška 404"
        description="Tražena stranica ne postoji."
      />
    </Layout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<any> = async (context) => {
  const response = await client().getEntries<IHeader>({
    content_type: HEADER_CONTENT_TYPE,
  });

  const header = response.items[0];

  return {
    props: {
      header,
    },
  };
};
