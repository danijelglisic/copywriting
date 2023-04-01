import React from "react";
import { IRichTextSection } from "@/@types/generated/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

interface RichTextSectionProps {
  props: IRichTextSection;
}

const RichTextSection = ({ props }: RichTextSectionProps) => {
  const { title, content } = props.fields;

  return (
    <div className="bg-secondary text-white">
      <div className="container space-y-8 py-20">
        <h2 className="heading-4">{title}</h2>
        <div className="">{content && documentToReactComponents(content)}</div>
      </div>
    </div>
  );
};

export default RichTextSection;
