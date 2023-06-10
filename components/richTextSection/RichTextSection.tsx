import React from "react";
import { IRichTextSection } from "@/@types/generated/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

interface RichTextSectionProps {
  props: IRichTextSection;
}

const RichTextSection = ({ props }: RichTextSectionProps) => {
  const { title, content } = props.fields;

  return (
    <div className="rich-text-bg text-secondary py-20">
      <div className="container flex items-center flex-col gap-8">
        <div className="text-center">
          <h2 className="heading-4">{title}</h2>
        </div>
        <div className="space-y-8 prose subtitle-2">
          {content && documentToReactComponents(content)}
        </div>
      </div>
    </div>
  );
};

export default RichTextSection;
