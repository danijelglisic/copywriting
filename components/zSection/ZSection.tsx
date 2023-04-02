import { IZSection } from "@/@types/generated/contentful";
import React from "react";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

interface ZSectionProps {
  props: IZSection;
}

const ZSection = ({ props }: ZSectionProps) => {
  const { image, imagePosition, title, subtitle, richText } = props.fields;

  const bgColor = imagePosition ? "bg-primary" : "bg-secondary";
  const textColor = imagePosition ? "text-secondary" : "text-white";
  const imageOrder = imagePosition ? "" : "order-2";

  return (
    <div className={bgColor + " py-20 " + textColor}>
      <div className="container">
        <div className="flex flex-col justify-between items-center lg:flex-row gap-6">
          <div className={imageOrder}>
            <Image
              className="rounded-xl"
              src={"https:" + image?.fields.image?.fields.file.url || ""}
              alt={image?.fields.imageDescription || ""}
              width={450}
              height={300}
            />
          </div>
          <div className="lg:max-w-[50%] space-y-4">
            <p className="body-1">{title}</p>
            <p className="regular-1">{subtitle}</p>
            {richText && documentToReactComponents(richText)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZSection;
