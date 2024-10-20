import React from "react";
import {
  ILandingSection,
  IRichTextSection,
  IPhotoSlider,
  IFreeConsultationBanner,
  IZSection,
  IReels,
  IPage,
  IVideoLandingSection,
} from "@/@types/generated/contentful";
import LandingSection from "../landingSection/LandingSection";
import RichTextSection from "../richTextSection/RichTextSection";
import Carousel from "../carousel/Carousel";
import FreeConsultationBanner from "../freeConsultationBanner/FreeConsultationBanner";
import ZSection from "../zSection/ZSection";
import VideoLandingSection from "../videoLandingSection/VideoLandingSection";
import dynamic from "next/dynamic";

const Reels = dynamic(() => import("../reels/Reels"), {
  ssr: false,
});

interface RenderComponentProps {
  sections:
    | (
        | IFreeConsultationBanner
        | ILandingSection
        | IPhotoSlider
        | IReels
        | IRichTextSection
        | IZSection
        | IVideoLandingSection
      )[]
    | undefined;
  isBlogPage?: boolean;
}
const RenderContent = ({ sections, isBlogPage }: RenderComponentProps) => {
  if (!sections) return <div></div>;

  const render = () => {
    return sections.map((section, id) => {
      if (section.sys.contentType.sys.id === "landingSection") {
        const landingSection = section as ILandingSection;
        return <LandingSection key={id} props={landingSection} />;
      }
      if (section.sys.contentType.sys.id === "richTextSection") {
        const richTextSection = section as IRichTextSection;
        return (
          <RichTextSection
            key={id}
            props={richTextSection}
            isBlogPage={isBlogPage}
          />
        );
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
      if (section.sys.contentType.sys.id === "videoLandingSection") {
        const reels = section as IVideoLandingSection;
        return <VideoLandingSection key={id} props={reels} />;
      }
    });
  };

  return <div>{render()}</div>;
};

export default RenderContent;
