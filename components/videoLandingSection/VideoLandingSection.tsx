import { IVideoLandingSection } from "@/@types/generated/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import React from "react";


interface VideoLandingSectionProps {
  props: IVideoLandingSection;
}

const VideoLandingSection = ({ props }: VideoLandingSectionProps) => {
  const fields = props.fields as any; // Temporary fix for type issue
  const { title, description, youtubeVideoUrl } = fields;
  return (
    <div className="bg-secondary bg-opacity-80 relative text-white">
      <Image
        src="/video-landing.webp"
        alt="copywriting"
        fill
        className="z-[-1] object-cover"
      />
      <div className="container py-20">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 lg:[&>*]:w-1/2 justify-between items-center">
          <div className="flex flex-col gap-16">
            <h1 className="heading-2">{title}</h1>
          </div>
          <div className="relative rounded-2xl overflow-hidden w-full items-center aspect-video">
            <iframe
              title="Copywriting video"
              src={youtubeVideoUrl}
              className="absolute w-full h-full top-0 bottom-0 left-0 right-0"
            />
          </div>
        </div>
        <div className="body-1 mt-12">
          {description && documentToReactComponents(description)}
        </div>
      </div>
    </div>
  );
};

export default VideoLandingSection;
