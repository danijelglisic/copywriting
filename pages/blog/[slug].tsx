import { IBlogPage, IHeader, IPage } from "@/@types/generated/contentful";
import Layout from "@/components/layout/Layout";
import { client } from "@/helpers/clinet";
import { GetStaticPaths, GetStaticProps } from "next";
import RenderContent from "@/components/renderContent/RenderContent";
import Metadata from "@/components/metadata/Metadata";
import { HEADER_CONTENT_TYPE, PAGE_TYPE } from "..";
import Image from "next/image";

const BLOG_TYPE = "blogPage";

interface BlogPageProps {
  header: IHeader;
  blog: IBlogPage;
}

const BlogPage = ({ header, blog }: BlogPageProps) => {
  const { contentSections } = blog.fields;

  return (
    <Layout links={header.fields?.headerLinks}>
      <Metadata
        title={blog.fields?.seoTitle}
        description={blog.fields.seoDescription}
        path={`blog/${blog.fields.slug}`}
      />
      <div className="pen-bg">
        <div className="container text-left pt-20 heading-3 text-secondary mb-10">
          <h1>{blog.fields.title}</h1>
        </div>
        <div className="container">
          <div className="relative h-[250px] md:h-[300px] lg:h-[400px]">
            <Image
              src={
                "https:" +
                  blog.fields.blogImage?.fields.image?.fields.file.url || ""
              }
              alt={blog.fields.blogImage?.fields.imageDescription || ""}
              fill
              className="rounded-xl object-cover"
            />
          </div>
        </div>
        <RenderContent sections={contentSections} isBlogPage={true} />
      </div>
    </Layout>
  );
};

export default BlogPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const pagesResponse = await client().getEntries<any>({
    content_type: BLOG_TYPE,
    include: 1,
  });
  if (!pagesResponse.items.length)
    return {
      paths: [],
      fallback: false,
    };
  const pages: IBlogPage[] = pagesResponse.items as IBlogPage[];

  const slugs = pages.map((item) => item.fields.slug);

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
  const homepageResponse = await client().getEntries<IBlogPage>({
    content_type: BLOG_TYPE,
    "fields.slug": slug,
    include: 10,
  });

  const header = response.items[0];
  const blog = homepageResponse.items[0];

  return {
    props: {
      header,
      blog,
    },
  };
};
