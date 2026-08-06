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
}

const ZSection = ({ props, isDark }: ZSectionProps) => {
  const fields = props.fields as any;
  const { image, imagePosition, title, subtitle, richText, cta } = fields;

  const bgColor = isDark ? "bg-navy" : "bg-white";
  const textColor = isDark ? "text-white" : "text-dark";
  const imageOrder = imagePosition ? "" : "order-2";

  console.info("ZSection Contentful title:", JSON.stringify(title));

  return (
    <div className={bgColor + " py-20 " + textColor}>
      <div className="container">
        <div className="flex flex-col justify-between items-center lg:flex-row gap-6 overflow-hidden">
          <FadeUp delay={0.1} className={imageOrder}>
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
            <p
              className="heading-4"
              style={{ fontWeight: 800, marginBottom: "48px" }}
            >
              {title && <AnimatedText text={title} />}
            </p>
            <FadeUp delay={0.15}>
              <p className="subtitle-2">{subtitle}</p>
            </FadeUp>
            <FadeUp delay={0.25} className="regular-1 p-height">
              {richText && documentToReactComponents(richText, richTextOptions)}
            </FadeUp>
            {cta?.fields.url && cta?.fields.text && (
              <FadeUp delay={0.35}>
                <Link legacyBehavior href={cta.fields.url}>
                  <a className="inline-block p-4 font-bold bg-secondary text-white w-fit">
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
