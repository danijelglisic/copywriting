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
import { FinalCtaPreview } from "@/pages/redesign-concepts";

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
  redesignedFinalCta?: boolean;
}
const RenderContent = ({
  sections,
  redesignedFinalCta,
}: RenderComponentProps) => {
  if (!sections) return <div></div>;

  const render = () => {
    // Prati da li je prethodna sekcija bila tamna, pa se sledeca postavlja
    // suprotno. Bez ovoga dve uzastopne tamne sekcije izgledaju kao jedna.
    let lastDark = false;
    const finalSection = sections
      .filter((section) => section?.sys?.contentType)
      .at(-1);

    return sections
      .filter((section) => section?.sys?.contentType)
      .map((section, id) => {
        if (section.sys.contentType.sys.id === "landingSection") {
          const landingSection = section as ILandingSection;
          lastDark = true;
          return <LandingSection key={id} props={landingSection} />;
        }
        if (section.sys.contentType.sys.id === "richTextSection") {
          const richTextSection = section as IRichTextSection;
          lastDark = false;
          return <RichTextSection key={id} props={richTextSection} />;
        }
        if (section.sys.contentType.sys.id === "photoSlider") {
          const photoSlider = section as IPhotoSlider;
          lastDark = false;
          return <Carousel key={id} props={photoSlider} />;
        }
        if (section.sys.contentType.sys.id === "freeConsultationBanner") {
          const consultationBanner = section as IFreeConsultationBanner;
          // Baner je uvek crn, ali i dalje broji kao tamna sekcija da sledeca
          // Z sekcija ispadne svetla.
          lastDark = true;
          if (redesignedFinalCta && section === finalSection) {
            const fields = consultationBanner.fields as any;
            return (
              <FinalCtaPreview
                key={id}
                section={{
                  headline: fields.text,
                  description: fields.description,
                  cta: fields.cta?.fields
                    ? {
                        label: fields.cta.fields.text,
                        href: fields.cta.fields.url,
                      }
                    : null,
                }}
              />
            );
          }
          return <FreeConsultationBanner key={id} props={consultationBanner} />;
        }
        if (section.sys.contentType.sys.id === "zSection") {
          const zSection = section as IZSection;
          const isDark = !lastDark;
          lastDark = isDark;
          return <ZSection key={id} props={zSection} isDark={isDark} />;
        }
        if (section.sys.contentType.sys.id === "reels") {
          const reels = section as IReels;
          return <Reels key={id} reels={reels} />;
        }
        if (section.sys.contentType.sys.id === "videoLandingSection") {
          const reels = section as IVideoLandingSection;
          lastDark = true;
          return <VideoLandingSection key={id} props={reels} />;
        }
      });
  };

  return <div>{render()}</div>;
};

export default RenderContent;
