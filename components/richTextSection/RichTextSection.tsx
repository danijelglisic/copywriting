import React from "react";
import { IRichTextSection } from "@/@types/generated/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { richTextOptions } from "@/helpers/richTextOptions";

interface RichTextSectionProps {
  props: IRichTextSection;
  isBlogPage?: boolean;
}

const RichTextSection = ({ props, isBlogPage }: RichTextSectionProps) => {
  const fields = props.fields as any; // Temporary fix for type issue
  const { title, content } = fields;

  return (
    <div className={isBlogPage ? "text-dark" : "text-dark py-20"}>
      <div className="container flex flex-col items-center gap-8">
        {!isBlogPage && title && (
          // h2, ne h1: primarni naslov strane dolazi iz hero sekcije. Ranije su
          // strane imale i po tri h1.
          <h2 className="heading-4 mb-8 text-center text-secondary">{title}</h2>
        )}
        <div className="w-full max-w-3xl body-2">
          {content && documentToReactComponents(content, richTextOptions)}
        </div>
      </div>
    </div>
  );
};

export default RichTextSection;
