import React from "react";
import {
  ILandingSection,
  IRichTextSection,
  IPhotoSlider,
} from "@/@types/generated/contentful";
import LandingSection from "../landingSection/LandingSection";
import RichTextSection from "../richTextSection/RichTextSection";

interface RenderComponentProps {
  sections: (ILandingSection | IRichTextSection | IPhotoSlider)[] | undefined;
}
const RenderContent = ({ sections }: RenderComponentProps) => {
  if (!sections) return <div></div>;

  const render = () => {
    return sections.map((section, id) => {
      if (section.sys.contentType.sys.id === "landingSection") {
        const landingSection = section as ILandingSection;
        return <LandingSection key={id} props={landingSection} />;
      }
      if (section.sys.contentType.sys.id === "richTextSection") {
        const richTextSection = section as IRichTextSection;
        return <RichTextSection key={id} props={richTextSection} />;
      }
    });
  };

  return <div>{render()}</div>;
};

export default RenderContent;
