import React from "react";
import { IRichTextSection } from "@/@types/generated/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

interface RichTextSectionProps {
  props: IRichTextSection;
}

const RichTextSection = ({ props }: RichTextSectionProps) => {
  const { title, content } = props.fields;

  return (
    <div className="bg-secondary text-white py-20">
      <div className="container space-y-8">
        <h2 className="heading-4">{title}</h2>
        <div className="">{content && documentToReactComponents(content)}</div>
      </div>
    </div>
  );
};

export default RichTextSection;
