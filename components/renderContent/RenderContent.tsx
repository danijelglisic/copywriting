import React from "react";
import {
  ILandingSection,
  IRichTextSection,
  IPhotoSlider,
  IFreeConsultationBanner,
  IZSection,
  IReels,
  IPage,
} from "@/@types/generated/contentful";
import LandingSection from "../landingSection/LandingSection";
import RichTextSection from "../richTextSection/RichTextSection";
import Carousel from "../carousel/Carousel";
import FreeConsultationBanner from "../freeConsultationBanner/FreeConsultationBanner";
import ZSection from "../zSection/ZSection";
import Reels from "../reels/Reels";

interface RenderComponentProps {
  sections:
    | (
        | IFreeConsultationBanner
        | ILandingSection
        | IPhotoSlider
        | IReels
        | IRichTextSection
        | IZSection
      )[]
    | undefined;
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
      if (section.sys.contentType.sys.id === "photoSlider") {
        const photoSlider = section as IPhotoSlider;
        return <Carousel key={id} props={photoSlider} />;
      }
      if (section.sys.contentType.sys.id === "freeConsultationBanner") {
        const consultationBanner = section as IFreeConsultationBanner;
        return <FreeConsultationBanner key={id} props={consultationBanner} />;
      }
      if (section.sys.contentType.sys.id === "zSection") {
        const zSection = section as IZSection;
        return <ZSection key={id} props={zSection} />;
      }
      if (section.sys.contentType.sys.id === "reels") {
        const reels = section as IReels;
        return <Reels key={id} reels={reels} />;
      }
    });
  };

  return <div>{render()}</div>;
};

export default RenderContent;
