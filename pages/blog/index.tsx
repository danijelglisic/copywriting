import { IBlogPage, IHeader, IPage } from "@/@types/generated/contentful";
import Layout from "@/components/layout/Layout";
import { client } from "@/helpers/clinet";
import { GetStaticProps } from "next";
import Metadata from "@/components/metadata/Metadata";
import { HEADER_CONTENT_TYPE } from "..";
import Image from "next/image";
import Link from "next/link";

const BLOG_TYPE = "blogPage";

interface BlogPageProps {
  header: IHeader;
  blogs: IBlogPage[];
}

const BlogPage = ({ header, blogs }: BlogPageProps) => {
  return (
    <Layout links={header.fields?.headerLinks}>
      <Metadata
        title={"Blogovi | Copywriting By Slaviša"}
        description={"Optimizuj svoj biznis | BLOG | Copywriting"}
      />
      <div className="pen-bg py-20 space-y-10 text-secondary container">
        <h1 className="heading-3">Blog</h1>
        <div className="flex flex-row flex-wrap gap-8 items-center">
          {blogs.map((blog) => {
            return (
              <Link
                key={blog.sys.id}
                href={"/blog/" + blog.fields.slug}
                className="min-w-[300px] max-w-[450px] group border-2 border-primary overflow-hidden rounded-xl bg-opacity-10 bg-transparent backdrop-filter backdrop-blur-sm hover:bg-primary hover:bg-opacity-10 hover:border-secondary"
              >
                <a>
                  <Image
                    src={
                      "https:" +
                        blog.fields.blogImage?.fields.image?.fields.file.url ||
                      ""
                    }
                    alt={blog.fields.blogImage?.fields.imageDescription || ""}
                    width={450}
                    height={300}
                    className="rounded"
                  />
                  <div className="p-8">
                    <h2 className="heading-5">{blog.fields.title}</h2>
                  </div>
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default BlogPage;

export const getStaticProps: GetStaticProps = async ({ params, preview }) => {
  const response = await client().getEntries<IHeader>({
    content_type: HEADER_CONTENT_TYPE,
  });
  const blogsResponse = await client().getEntries<any>({
    content_type: BLOG_TYPE,
    include: 10,
    limit: 1000,
  });

  const header = response.items[0];
  const blogs: IBlogPage[] = blogsResponse.items as IBlogPage[];

  return {
    props: {
      header,
      blogs,
    },
  };
};
