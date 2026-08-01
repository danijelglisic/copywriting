import Layout from "@/components/layout/Layout";
import Metadata from "@/components/metadata/Metadata";
import HeroSection from "@/components/heroSection/HeroSection";

const NotFound = () => (
  <Layout>
    <Metadata
      title={"Page Not Found | Error 404"}
      description={"The page you are looking for does not exist."}
      path="404"
    />
    <HeroSection heading="Error 404" description="PAGE NOT FOUND" />
  </Layout>
);

export default NotFound;
