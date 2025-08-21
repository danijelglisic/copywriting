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
    <Layout links={(header.fields as any)?.headerLinks}>
      <Metadata
        title={"Blogovi | Copywriting By Slaviša"}
        description={"Optimizuj svoj biznis | BLOG | Copywriting"}
        path="blog"
      />
      <div className="pen-bg py-20 space-y-10 text-secondary container">
        <h1 className="heading-3">Blogovi | Copywriting By Slaviša</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 items-center">
          {blogs.map((blog) => {
            return (
              <div
                key={blog.sys.id}
                className="h-full group border-2 border-primary overflow-hidden rounded-xl bg-opacity-10 bg-transparent backdrop-filter backdrop-blur-sm hover:bg-primary hover:bg-opacity-10 hover:border-secondary"
              >
                <Link
                  legacyBehavior
                  href={"/blog/" + (blog.fields as any)?.slug}
                >
                  <a className="w-full h-full flex flex-col justify-start">
                    <div className="relative w-full aspect-[4/3]">
                      <Image
                        src={
                          "https:" +
                            (blog.fields as any)?.blogImage?.fields.image
                              ?.fields.file.url || ""
                        }
                        alt={
                          (blog.fields as any)?.blogImage?.fields
                            .imageDescription || ""
                        }
                        fill
                        className="rounded object-cover"
                      />
                    </div>
                    <div className="p-8">
                      <h2 className="heading-5">
                        {(blog.fields as any)?.title}
                      </h2>
                    </div>
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default BlogPage;

export const getStaticProps: GetStaticProps = async ({ params, preview }) => {
  const response = await client().getEntries({
    content_type: HEADER_CONTENT_TYPE,
  });
  const blogsResponse = await client().getEntries({
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
