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
  useRedesignFinalCta?: boolean;
  useVideoAdsRedesign?: boolean;
  reorderPortfolioVideoResult?: boolean;
  portfolioHeroEyebrow?: string;
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
}
const RenderContent = ({
  sections,
  useRedesignFinalCta,
  useVideoAdsRedesign,
  reorderPortfolioVideoResult,
  portfolioHeroEyebrow,
}: RenderComponentProps) => {
  if (!sections) return <div></div>;

  const render = () => {
    // Prati da li je prethodna sekcija bila tamna, pa se sledeca postavlja
    // suprotno. Bez ovoga dve uzastopne tamne sekcije izgledaju kao jedna.
    let lastDark = false;
    let regularSectionIndex = 0;

    return sections
      .filter((section) => section?.sys?.contentType)
      .map((section, id) => {
        const contentType = section.sys.contentType.sys.id;
        const isConsultationBanner = contentType === "freeConsultationBanner";
        const backgroundClass =
          regularSectionIndex % 2 === 0
            ? "[&>*]:!bg-[#F9F9F7] [&>*]:!text-dark"
            : "[&>*]:!bg-white [&_.rich-text-content]:!mx-0";
        const renderVideoAdsSection = (content: React.ReactNode) => {
          if (!useVideoAdsRedesign || isConsultationBanner) return content;

          regularSectionIndex += 1;
          return (
            <div key={id} className={backgroundClass}>
              {content}
            </div>
          );
        };

        if (contentType === "landingSection") {
          const landingSection = section as ILandingSection;
          lastDark = true;
          return renderVideoAdsSection(
            <LandingSection key={id} props={landingSection} />
          );
        }
        if (contentType === "richTextSection") {
          const richTextSection = section as IRichTextSection;
          lastDark = false;
          return renderVideoAdsSection(
            <RichTextSection key={id} props={richTextSection} />
          );
        }
        if (section.sys.contentType.sys.id === "photoSlider") {
          const photoSlider = section as IPhotoSlider;
          lastDark = false;
          return renderVideoAdsSection(
            <Carousel key={id} props={photoSlider} />
          );
        }
        if (section.sys.contentType.sys.id === "freeConsultationBanner") {
          const consultationBanner = section as IFreeConsultationBanner;
          // Baner je uvek crn, ali i dalje broji kao tamna sekcija da sledeca
          // Z sekcija ispadne svetla.
          lastDark = true;
          if (
            useVideoAdsRedesign ||
            (useRedesignFinalCta && id === sections.length - 1)
          ) {
            const fields = consultationBanner.fields as any;
            return (
              <FinalCtaPreview
                key={id}
                section={{
                  headline: fields.text ?? null,
                  description: fields.description ?? null,
                  cta: fields.cta?.fields
                    ? {
                        label: fields.cta.fields.text ?? null,
                        href: fields.cta.fields.url ?? null,
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
          const zSectionFields = zSection.fields as any;
          const contentFirst =
            reorderPortfolioVideoResult &&
            zSectionFields.title?.trim().toUpperCase() ===
              "10X MORE SALES FROM THE FIRST VIDEO";
          const isDark = !lastDark;
          lastDark = isDark;
          return renderVideoAdsSection(
            <ZSection
              key={id}
              props={zSection}
              isDark={isDark}
              contentFirst={contentFirst}
            />
          );
        }
        if (section.sys.contentType.sys.id === "reels") {
          const reels = section as IReels;
          return renderVideoAdsSection(<Reels key={id} reels={reels} />);
        }
        if (section.sys.contentType.sys.id === "videoLandingSection") {
          const reels = section as IVideoLandingSection;
          lastDark = true;
          return renderVideoAdsSection(
            <VideoLandingSection
              key={id}
              props={reels}
              eyebrow={
                useVideoAdsRedesign ? "AD COPYWRITER" : portfolioHeroEyebrow
              }
            />
          );
        }
      });
  };

  return <div>{render()}</div>;
};

export default RenderContent;
