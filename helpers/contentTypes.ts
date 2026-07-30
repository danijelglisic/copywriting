import { IHeader, IPage } from "@/@types/generated/contentful";

export const HEADER_CONTENT_TYPE = "header";
export const LANDING_SECTION_TYPE = "landingSection";
export const PAGE_TYPE = "page";

// Slug engleske pocetne strane u Contentfulu. Engleske podstrane su
// `en/portfolio`, `en/contact`, itd.
export const EN_HOME_SLUG = "en";
export const EN_PREFIX = "en/";

export interface PageProps {
  header: IHeader;
  homepage: IPage;
}
