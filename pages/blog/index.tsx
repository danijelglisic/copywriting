import { IBlogPage, IHeader } from "@/@types/generated/contentful";
import Layout from "@/components/layout/Layout";
import { client } from "@/helpers/clinet";
import { GetStaticProps } from "next";
import Metadata from "@/components/metadata/Metadata";
import { HEADER_CONTENT_TYPE } from "@/helpers/contentTypes";
import Image from "next/image";
import Link from "next/link";

const BLOG_TYPE = "blogPage";

interface BlogPageProps {
  header: IHeader;
  blogs: IBlogPage[];
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("sr-Latn", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function BlogCard({ blog, featured = false }: { blog: IBlogPage; featured?: boolean }) {
  const fields = blog.fields as any;
  const imageUrl = fields?.blogImage?.fields.image?.fields.file.url;
  const slug = fields?.slug;
  const title = fields?.title;
  const date = formatDate(blog.sys.createdAt);

  return (
    <Link href={"/blog/" + slug} className="group block h-full">
      <article className={`h-full flex flex-col bg-white overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 ${featured ? "lg:flex-row" : ""}`}>
        <div className={`relative overflow-hidden ${featured ? "lg:w-1/2 aspect-[4/3] lg:aspect-auto" : "aspect-[16/9]"}`}>
          {imageUrl && (
            <Image
              src={"https:" + imageUrl}
              alt={fields?.blogImage?.fields.imageDescription || title || ""}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-dark opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        </div>
        <div className={`flex flex-col justify-center gap-4 p-6 ${featured ? "lg:w-1/2 lg:p-10" : ""}`}>
          <span className="text-secondary body-4 font-semibold uppercase tracking-widest">Blog</span>
          <h2 className={featured ? "heading-3 text-dark" : "heading-5 text-dark"}>{title}</h2>
          <p className="text-gray-400 body-4">{date}</p>
          <span className="text-secondary body-3 font-semibold group-hover:underline w-fit">
            Pročitaj →
          </span>
        </div>
      </article>
    </Link>
  );
}

const BlogPage = ({ header, blogs }: BlogPageProps) => {
  const [featured, ...rest] = blogs;

  return (
    <Layout links={(header.fields as any)?.headerLinks}>
      <Metadata
        title={"Blogovi | Copywriting By Slaviša"}
        description={"Optimizuj svoj biznis | BLOG | Copywriting"}
        path="blog"
      />

      <div className="bg-navy py-20">
        <div className="container text-white">
          <p className="text-secondary body-3 font-semibold uppercase tracking-widest mb-3">Blog</p>
          <h1 className="heading-2">Copywriting savjeti</h1>
        </div>
      </div>

      <div className="container py-16 space-y-16">
        {featured && (
          <div>
            <BlogCard blog={featured} featured />
          </div>
        )}

        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {rest.map((blog) => (
              <BlogCard key={blog.sys.id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BlogPage;

export const getStaticProps: GetStaticProps = async () => {
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
