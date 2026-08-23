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
  showAdExamples?: boolean;
}

const adExamples = [
  {
    label: "HOOK",
    image: "/portfolio/ad-examples/hook.webp",
    alt: "Club staff introduced as the most dangerous cartel in central Belgrade",
    copy: [
      'We introduced the club staff as "the most dangerous cartel in central Belgrade".',
      "The next few seconds reveal they're anything but.",
    ],
  },
  {
    label: "ANGLE",
    image: "/portfolio/ad-examples/angle.webp",
    alt: "Mobsters arriving at the club to collect protection money",
    copy: [
      'The "mobsters" came to collect protection money.',
      "The joke? With prices this low, the club should be collecting from them.",
    ],
  },
  {
    label: "VISUAL PROOF",
    image: "/portfolio/ad-examples/visual-proof.webp",
    alt: "Ten shots shown together in one frame",
    copy: [
      "Instead of saying what 13 EUR gets you, we showed it.",
      "Ten shots. One frame.",
    ],
  },
];

const ZSection = ({
  props,
  isDark,
  contentFirst,
  showAdExamples,
}: ZSectionProps) => {
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
            {!showAdExamples && cta?.fields.url && cta?.fields.text && (
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
        {showAdExamples && (
          <FadeUp delay={0.3} className="mt-16 lg:mt-20">
            <h3 className="heading-4 mb-8 lg:mb-10">WHAT THAT LOOKED LIKE</h3>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-6">
              {adExamples.map((example) => (
                <article
                  key={example.label}
                  className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white text-dark shadow-[0_18px_38px_rgba(10,31,68,0.12)]"
                >
                  <Image
                    src={example.image}
                    alt={example.alt}
                    width={1080}
                    height={1350}
                    className="h-auto w-full"
                  />
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <p className="text-sm font-bold tracking-[0.14em] text-navy">
                      {example.label}
                    </p>
                    <p className="regular-3 leading-relaxed">
                      {example.copy.map((line, index) => (
                        <React.Fragment key={line}>
                          {index > 0 && <br />}
                          {line}
                        </React.Fragment>
                      ))}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </FadeUp>
        )}
        {showAdExamples && cta?.fields.url && cta?.fields.text && (
          <FadeUp delay={0.35} className="mt-10 mb-2 lg:mt-12">
            <Link legacyBehavior href={cta.fields.url}>
              <a className="inline-block rounded-full bg-navy px-7 py-[0.8125rem] text-center text-sm font-semibold text-white shadow-[0_18px_38px_rgba(10,31,68,0.16)] outline-offset-4 ring-1 ring-navy/10 transition duration-300 hover:-translate-y-0.5 hover:bg-black active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-black">
                {cta.fields.text}
              </a>
            </Link>
          </FadeUp>
        )}
      </div>
    </div>
  );
};

export default ZSection;
