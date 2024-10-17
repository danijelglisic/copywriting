import React from "react";
import { IRichTextSection } from "@/@types/generated/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

interface RichTextSectionProps {
  props: IRichTextSection;
  isBlogPage?: boolean;
}

const RichTextSection = ({ props, isBlogPage }: RichTextSectionProps) => {
  const { title, content } = props.fields;
  const style = isBlogPage ? "text-secondary" : "text-secondary py-20";

  return (
    <div className={style}>
      <div className="container flex items-center flex-col gap-8">
        <div className="text-center mb-20">
          {!isBlogPage && <h1 className="heading-4">{title}</h1>}
        </div>
        <div className="space-y-8 prose subtitle-2">
          {content && documentToReactComponents(content)}
        </div>
      </div>
    </div>
  );
};

export default RichTextSection;
