import { IZSection } from "@/@types/generated/contentful";
import React from "react";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { richTextOptions } from "@/helpers/richTextOptions";
import Link from "next/link";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { FadeUp } from "@/components/ui/FadeUp";

interface ZSectionProps {
  props: IZSection;
  /**
   * Pozadinu odredjuje redosled sekcija na strani, ne `imagePosition`. Ranije
   * su dve uzastopne sekcije sa istim `imagePosition` dobijale istu teget
   * pozadinu i vizuelno se stapale — klijent je to prijavio na Home i
   * Portfolio stranama. `imagePosition` sada kontrolise samo stranu slike.
   */
  isDark?: boolean;
  contentFirst?: boolean;
}

const ZSection = ({ props, isDark, contentFirst }: ZSectionProps) => {
  const fields = props.fields as any;
  const { image, imagePosition, title, subtitle, richText, cta } = fields;

  const bgColor = isDark ? "bg-navy" : "bg-white";
  const textColor = isDark ? "text-white" : "text-dark";
  const imageOrder = contentFirst || !imagePosition ? "order-2" : "";
  const isCaseStudyCta =
    cta?.fields.text?.trim().toLowerCase() === "read the full case study";

  return (
    <div className={"z-section " + bgColor + " py-20 " + textColor}>
      <div className="container">
        <div
          className={`flex flex-col justify-between items-center lg:flex-row gap-6 ${
            isCaseStudyCta ? "max-lg:gap-10" : ""
          }`}
        >
          <FadeUp delay={0.1} className={`z-section-visual ${imageOrder}`}>
            {image?.fields.image?.fields.file.url && (
              <Image
                src={"https:" + image.fields.image.fields.file.url}
                alt={image?.fields.imageDescription || ""}
                width={450}
                height={300}
              />
            )}
          </FadeUp>
          <div className="lg:max-w-[50%] flex flex-col gap-4">
            <p className="z-section-title heading-4">
              {title && <AnimatedText text={title} />}
            </p>
            <FadeUp delay={0.15}>
              <p className="z-section-subtitle subtitle-2">{subtitle}</p>
            </FadeUp>
            <FadeUp delay={0.25} className="z-section-body regular-1 p-height">
              {richText && documentToReactComponents(richText, richTextOptions)}
            </FadeUp>
            {cta?.fields.url && cta?.fields.text && (
              <FadeUp
                delay={0.35}
                className={`z-section-cta ${
                  isCaseStudyCta ? "max-lg:mt-4 max-lg:mb-2" : ""
                }`}
              >
                <Link legacyBehavior href={cta.fields.url}>
                  <a className="rounded-full bg-navy px-7 py-[0.8125rem] text-center text-sm font-semibold text-white shadow-[0_18px_38px_rgba(10,31,68,0.16)] outline-offset-4 ring-1 ring-navy/10 transition duration-300 hover:-translate-y-0.5 hover:bg-black active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-black">
                    {cta.fields.text}
                  </a>
                </Link>
              </FadeUp>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZSection;
