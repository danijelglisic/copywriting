import { IFreeConsultationBanner } from "@/@types/generated/contentful";
import React from "react";

interface BannerProps {
  props: IFreeConsultationBanner;
}

const FreeConsultationBanner = ({ props }: BannerProps) => {
  const { text, description, cta } = props.fields;
  return (
    <div className="py-10 bg-secondary">
      <div className="container">
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="text-white heading-4">
            <h3>{text}</h3>
          </div>
          <div className="text-white body-1">
            <p>{description}</p>
          </div>
          <div className="body-1">
            <a
              className="p-2 hover:underline bg-primary rounded text-white"
              href={cta?.fields.url}
            >
              {cta?.fields.text}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeConsultationBanner;
