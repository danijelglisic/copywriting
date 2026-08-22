import { IVideoLandingSection } from "@/@types/generated/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { richTextOptions } from "@/helpers/richTextOptions";
import Image from "next/image";
import React from "react";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { FadeUp } from "@/components/ui/FadeUp";

interface VideoLandingSectionProps {
  props: IVideoLandingSection;
  eyebrow?: string;
  contentBeforeVisual?: boolean;
}

const VideoLandingSection = ({
  props,
  eyebrow,
  contentBeforeVisual,
}: VideoLandingSectionProps) => {
  const fields = props.fields as any;
  const { title, description, youtubeVideoUrl, image } = fields;
  const imageUrl = typeof image?.fields?.file?.url === "string" ? image.fields.file.url as string : undefined;
  const descriptionBlock = (
    <FadeUp delay={0.3} className="body-1 mt-12">
      {description && documentToReactComponents(description, richTextOptions)}
    </FadeUp>
  );

  return (
    <div className="bg-navy bg-opacity-80 relative text-white">
      <Image
        src="/video-landing.webp"
        alt="copywriting"
        fill
        className="z-[-1] object-cover"
      />
      <div className="container py-20">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 lg:[&>*]:w-1/2 justify-between items-center">
          <div
            className={`flex flex-col ${
              contentBeforeVisual ? "lg:order-1" : "gap-16"
            }`}
          >
            <h1 className="heading-2">
              {eyebrow && (
                <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.18em] text-dark/60 sm:text-sm">
                  {eyebrow}
                </span>
              )}
              {title && <AnimatedText text={title} />}
            </h1>
            {contentBeforeVisual ? descriptionBlock : null}
          </div>
          {(imageUrl || youtubeVideoUrl) && (
            <FadeUp
              delay={0.2}
              className={`z-section-visual w-full items-center ${
                contentBeforeVisual ? "lg:order-2" : ""
              }`}
            >
              <div className="relative overflow-hidden w-full aspect-video rounded-[1.35rem]">
                {imageUrl ? (
                  <Image
                    src={`https:${imageUrl}`}
                    alt={image?.fields?.title || title || ""}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <iframe
                    title="Copywriting video"
                    src={youtubeVideoUrl}
                    className="absolute w-full h-full top-0 bottom-0 left-0 right-0"
                  />
                )}
              </div>
            </FadeUp>
          )}
        </div>
        {!contentBeforeVisual ? descriptionBlock : null}
      </div>
    </div>
  );
};

export default VideoLandingSection;
