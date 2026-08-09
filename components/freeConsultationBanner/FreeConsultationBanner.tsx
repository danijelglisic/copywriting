import { IFreeConsultationBanner } from "@/@types/generated/contentful";
import React from "react";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { FadeUp } from "@/components/ui/FadeUp";

interface BannerProps {
  props: IFreeConsultationBanner;
  useHomeStyle?: boolean;
}

// CTA baner je uvek crn. Time se izdvaja od teget sekcija bez obzira na to
// gde se nadje na strani, pa je i redosled sekcija nebitan za njegovu boju.
const FreeConsultationBanner = ({ props, useHomeStyle }: BannerProps) => {
  const fields = props.fields as any;
  const { text, description, cta } = fields;
  return (
    <div
      className={
        useHomeStyle ? "bg-dark py-16 text-white sm:py-20" : "py-24 bg-dark"
      }
    >
      <div className="container">
        <div
          className={
            useHomeStyle
              ? "mx-auto max-w-4xl text-center"
              : "flex flex-col items-center justify-center text-center gap-8"
          }
        >
          <h2
            className={
              useHomeStyle
                ? "text-4xl font-semibold leading-tight tracking-[-0.045em] text-white sm:text-5xl"
                : "text-white heading-4"
            }
          >
            {text && <AnimatedText text={text} />}
          </h2>
          <FadeUp
            delay={0.2}
            className={
              useHomeStyle
                ? "mx-auto mt-8 max-w-3xl text-lg leading-9 text-white/72"
                : "text-white body-1"
            }
          >
            <p>{description}</p>
          </FadeUp>
          <FadeUp delay={0.35} className={useHomeStyle ? "mt-6" : undefined}>
            <a
              className={
                useHomeStyle
                  ? "rounded-full bg-navy px-7 py-[0.8125rem] text-center text-sm font-semibold text-white shadow-[0_18px_38px_rgba(10,31,68,0.16)] outline-offset-4 ring-1 ring-navy/10 transition duration-300 hover:-translate-y-0.5 hover:bg-black active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-black"
                  : "inline-block px-10 py-4 bg-secondary text-white font-bold body-2 hover:bg-primary-contrast transition-colors duration-200"
              }
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
