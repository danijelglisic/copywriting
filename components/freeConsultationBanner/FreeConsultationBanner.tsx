import { IFreeConsultationBanner } from "@/@types/generated/contentful";
import React from "react";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { FadeUp } from "@/components/ui/FadeUp";

interface BannerProps {
  props: IFreeConsultationBanner;
  /**
   * Ako je prethodna sekcija vec teget, baner ide na crnu da se dve tamne
   * povrsine ne stope u jednu. Klijent je to prijavio na Portfolio strani.
   */
  afterDark?: boolean;
}

const FreeConsultationBanner = ({ props, afterDark }: BannerProps) => {
  const fields = props.fields as any;
  const { text, description, cta } = fields;
  return (
    <div className={`py-24 ${afterDark ? "bg-dark" : "bg-navy"}`}>
      <div className="container">
        <div className="flex flex-col items-center justify-center text-center gap-8">
          <h2 className="text-white heading-4">
            {text && <AnimatedText text={text} />}
          </h2>
          <FadeUp delay={0.2} className="text-white body-1">
            <p>{description}</p>
          </FadeUp>
          <FadeUp delay={0.35}>
            <a
              className="inline-block px-10 py-4 bg-secondary text-white font-bold body-2 hover:bg-primary-contrast transition-colors duration-200"
              href={cta?.fields.url}
            >
              {cta?.fields.text} →
            </a>
          </FadeUp>
        </div>
      </div>
    </div>
  );
};

export default FreeConsultationBanner;
