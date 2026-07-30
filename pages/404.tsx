import { IHeader } from "@/@types/generated/contentful";
import Layout from "@/components/layout/Layout";
import { client } from "@/helpers/clinet";
import { GetStaticProps } from "next";
import Metadata from "@/components/metadata/Metadata";
import HeroSection from "@/components/heroSection/HeroSection";
import { HEADER_CONTENT_TYPE } from "@/helpers/contentTypes";

interface NotFoundProps {
  header: IHeader;
}

const NotFound = ({ header }: NotFoundProps) => {
  return (
    <Layout links={(header?.fields as any)?.headerLinks} isEnglish>
      <Metadata
        title={"Page Not Found | Error 404"}
        description={"The page you are looking for does not exist."}
        path="404"
      />
      <HeroSection
        heading="Error 404"
        description="PAGE NOT FOUND"
      />
    </Layout>
  );
};

export default NotFound;

export const getStaticProps: GetStaticProps<any> = async () => {
  const response = await client().getEntries({
    content_type: HEADER_CONTENT_TYPE,
  });

  return {
    props: {
      header: response.items[0] ?? null,
    },
  };
};
