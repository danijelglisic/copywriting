import React from "react";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { richTextOptions } from "@/helpers/richTextOptions";
import { ILandingSection } from "@/@types/generated/contentful";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { FadeUp } from "@/components/ui/FadeUp";

interface LandingSectionprops {
  props: ILandingSection;
  eyebrow?: string;
}

const LandingSection = ({ props, eyebrow }: LandingSectionprops) => {
  const fields = props.fields as any;

  return (
    <div className="relative gradient py-20 overflow-hidden">
      <div className="container py-10 heading-4 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-20">
          <h1 className="heading-2 drop-shadow">
            {eyebrow && (
              <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.18em] text-dark/60 sm:text-sm">
                {eyebrow}
              </span>
            )}
            {fields.heading && <AnimatedText text={fields.heading} />}
          </h1>
          <ul className="list-disc ml-8 space-y-2">
            {fields.heading2?.map((heading: any, id: number) => (
              <FadeUp key={id} delay={0.1 * id}>
                <li>
                  <h2 className="heading-3 text-secondary">{heading}</h2>
                </li>
              </FadeUp>
            ))}
          </ul>
          <FadeUp delay={0.2} className="body-1 p-height mt-4">
            {fields.text && documentToReactComponents(fields.text, richTextOptions)}
          </FadeUp>
        </div>
        <FadeUp delay={0.3} className="overflow-hidden min-w-[30%]">
          {fields.image && (
            <Image
              src={"https:" + fields.image.fields.file.url}
              alt={fields.image.fields.description}
              width={500}
              height={500}
            />
          )}
        </FadeUp>
      </div>
    </div>
  );
};

export default LandingSection;
