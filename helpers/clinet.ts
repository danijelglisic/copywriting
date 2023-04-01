import { createClient, ContentfulClientApi } from "contentful";

let contentfulClient: ContentfulClientApi;

export const client = (): ContentfulClientApi => {
  if (contentfulClient) {
    return contentfulClient;
  }

  contentfulClient = createClient({
    space: process.env.CONTENTFUL_SPACE_ID || "",
    accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN || "",
    environment: process.env.CONTENTFUL_ENVIRONMENT,
  });

  return contentfulClient;
};
