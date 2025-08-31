import Head from "next/head";
import React from "react";

const SITE_URL = process.env.SITEMAP_URL;

interface MetadataProps {
  title: string | undefined;
  description: string | undefined;
  path: string;
}

const Metadata = ({ title, description, path }: MetadataProps) => {
  const pageUrl = `https://www.copywritingbyslavisa.com/${path}`;
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/static/favicon.ico" />
      <link rel="canonical" href={pageUrl} />
      <meta name="description" content={description} key="desc" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="/placeholder.jpg" />
    </Head>
  );
};

export default Metadata;
