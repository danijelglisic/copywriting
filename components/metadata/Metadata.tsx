import Head from "next/head";
import React from "react";

import { siteUrl } from "@/helpers/siteUrl";

const SITE_URL = siteUrl();

interface MetadataProps {
  title: string | undefined;
  description: string | undefined;
  path: string;
}

const Metadata = ({ title, description, path }: MetadataProps) => {
  const cleanPath = path.replace(/^\/+/, "");
  const pageUrl = cleanPath ? `${SITE_URL}/${cleanPath}` : `${SITE_URL}/`;

  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="canonical" href={pageUrl} />
      <meta name="description" content={description} key="desc" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${SITE_URL}/placeholder.jpg`} />
    </Head>
  );
};

export default Metadata;
