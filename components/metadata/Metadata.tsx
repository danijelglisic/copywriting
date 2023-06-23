import Head from "next/head";
import React from "react";

interface MetadataProps {
  title: string | undefined;
  description: string | undefined;
}

const Metadata = ({ title, description }: MetadataProps) => {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/static/favicon.ico" />
      <meta name="description" content={description} key="desc" />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="../../assets/placeholder.jpg" />
    </Head>
  );
};

export default Metadata;
