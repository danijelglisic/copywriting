import React from "react";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { ILandingSection } from "@/@types/generated/contentful";

interface LandingSectionprops {
  props: ILandingSection;
}

const LandingSection = ({ props }: LandingSectionprops) => {
  return (
    <div className="relative gradient py-20">
      <div className="container py-10 heading-4 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-6">
          <h1 className="heading-1 drop-shadow">{props.fields.heading}</h1>
          <ul className="list-disc ml-8 space-y-2">
            {props.fields.heading2?.map((heading, id) => (
              <li key={id}>
                <h2 className="heading-3 text-secondary">{heading}</h2>
              </li>
            ))}
          </ul>
          <div className="body-1">
            {props.fields.text && documentToReactComponents(props.fields.text)}
          </div>
        </div>
        <div className="rounded-full overflow-hidden">
          {props.fields.image && (
            <Image
              src={"https:" + props.fields.image.fields.file.url}
              alt={props.fields.image.fields.description}
              width={500}
              height={500}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingSection;
