import { IBlogPage, IHeader } from "@/@types/generated/contentful";
import Layout from "@/components/layout/Layout";
import { client } from "@/helpers/clinet";
import { GetStaticPaths, GetStaticProps } from "next";
import RenderContent from "@/components/renderContent/RenderContent";
import Metadata from "@/components/metadata/Metadata";
import { HEADER_CONTENT_TYPE } from "@/helpers/contentTypes";
import Image from "next/image";
import Link from "next/link";

const BLOG_TYPE = "blogPage";

interface BlogPageProps {
  header: IHeader;
  blog: IBlogPage;
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("sr-Latn", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const BlogPage = ({ header, blog }: BlogPageProps) => {
  const fields = blog.fields as any;
  const contentSections = fields?.contentSections;
  const imageUrl = fields?.blogImage?.fields.image?.fields.file.url;
  const title = fields?.title;
  const date = formatDate(blog.sys.createdAt);

  return (
    <Layout links={(header.fields as any)?.headerLinks}>
      <Metadata
        title={fields?.seoTitle}
        description={fields?.seoDescription}
        path={`blog/${fields?.slug}`}
      />

      <div className="bg-navy py-16">
        <div className="container">
          <Link href="/blog" className="inline-flex items-center gap-2 text-secondary body-3 font-semibold mb-8 hover:underline">
            ← Svi blogovi
          </Link>
          <p className="text-secondary body-3 font-semibold uppercase tracking-widest mb-3">Blog</p>
          <h1 className="heading-2 text-white max-w-3xl">{title}</h1>
          <p className="text-gray-400 body-3 mt-4">{date}</p>
        </div>
      </div>

      {imageUrl && (
        <div className="container py-10">
          <div className="relative w-full h-[300px] md:h-[450px] lg:h-[560px] overflow-hidden">
            <Image
              src={"https:" + imageUrl}
              alt={fields?.blogImage?.fields.imageDescription || title || ""}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      <RenderContent sections={contentSections} isBlogPage={true} />

      <div className="container py-16 border-t border-gray-100 mt-8">
        <Link href="/blog" className="inline-flex items-center gap-2 text-secondary body-2 font-semibold hover:underline">
          ← Nazad na blog
        </Link>
      </div>
    </Layout>
  );
};

export default BlogPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const pagesResponse = await client().getEntries({
    content_type: BLOG_TYPE,
    include: 1,
  });
  if (!pagesResponse.items.length)
    return { paths: [], fallback: false };

  const pages: IBlogPage[] = pagesResponse.items as IBlogPage[];
  const slugs = pages.map((item) => (item.fields as any)?.slug);
  const paths = slugs.map((slug) => ({ params: { slug } }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };

  const response = await client().getEntries({
    content_type: HEADER_CONTENT_TYPE,
  });
  const homepageResponse = await client().getEntries({
    content_type: BLOG_TYPE,
    "fields.slug": slug,
    include: 10,
  });

  const header = response.items[0];
  const blog = homepageResponse.items[0];

  return {
    props: { header, blog },
  };
};
