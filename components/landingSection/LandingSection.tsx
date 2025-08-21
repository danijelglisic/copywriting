import React from "react";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { ILandingSection } from "@/@types/generated/contentful";
import { Variants, motion } from "framer-motion";

interface LandingSectionprops {
  props: ILandingSection;
}

const leftElement: Variants = {
  offscreen: {
    y: 500,
  },
  onscreen: {
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const LandingSection = ({ props }: LandingSectionprops) => {
  const fields = props.fields as any; // Temporary fix for type issue

  return (
    <div className="relative gradient py-20 overflow-hidden">
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true }}
      >
        <motion.div variants={leftElement}>
          <div className="container py-10 heading-4 text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-20">
              <h1 className="heading-2 drop-shadow">{fields.heading}</h1>
              <ul className="list-disc ml-8 space-y-2">
                {fields.heading2?.map((heading: any, id: number) => (
                  <li key={id}>
                    <h2 className="heading-3 text-secondary">{heading}</h2>
                  </li>
                ))}
              </ul>
              <div className="body-1 p-height mt-4">
                {fields.text && documentToReactComponents(fields.text)}
              </div>
            </div>
            <div className="rounded-full overflow-hidden min-w-[30%]">
              {fields.image && (
                <Image
                  src={"https:" + fields.image.fields.file.url}
                  alt={fields.image.fields.description}
                  width={500}
                  height={500}
                />
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LandingSection;
