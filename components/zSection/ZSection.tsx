import { IZSection } from "@/@types/generated/contentful";
import React from "react";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Link from "next/link";
import { Variants, motion } from "framer-motion";

interface ZSectionProps {
  props: IZSection;
}

const leftElement: Variants = {
  offscreen: {
    x: -300,
  },
  onscreen: {
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const rightElement: Variants = {
  offscreen: {
    x: 300,
  },
  onscreen: {
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const ZSection = ({ props }: ZSectionProps) => {
  const { image, imagePosition, title, subtitle, richText, cta } = props.fields;

  const bgColor = imagePosition
    ? "bg-primary typewrite-bg"
    : "bg-secondary pen-bg";
  const textColor = imagePosition ? "text-secondary" : "text-white";
  const buttonBgColor = imagePosition ? "bg-secondary" : "bg-primary";
  const buttonTxtColor = !imagePosition ? "text-secondary" : "text-white";
  const imageOrder = imagePosition ? "" : "order-2";

  return (
    <div className={bgColor + " py-20 " + textColor}>
      <div className="container">
        <div className="flex flex-col justify-between items-center lg:flex-row gap-6 overflow-hidden">
          <div className={imageOrder}>
            <motion.div
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true }}
            >
              <motion.div
                variants={!imagePosition ? rightElement : leftElement}
              >
                <Image
                  className="rounded-xl"
                  src={"https:" + image?.fields.image?.fields.file.url || ""}
                  alt={image?.fields.imageDescription || ""}
                  width={450}
                  height={300}
                />
              </motion.div>
            </motion.div>
          </div>
          <div className="lg:max-w-[50%]">
            <motion.div
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true }}
            >
              <motion.div
                className="flex flex-col gap-4"
                variants={imagePosition ? rightElement : leftElement}
              >
                <p className="heading-4">{title}</p>
                <p className="subtitle-2">{subtitle}</p>
                <div className="regular-1 p-height">
                  {richText && documentToReactComponents(richText)}
                </div>
                {cta?.fields.url && cta?.fields.text && (
                  <Link legacyBehavior href={cta?.fields.url}>
                    <a
                      className={`p-4 font-bold ${buttonBgColor} ${buttonTxtColor} w-fit rounded`}
                    >
                      {cta?.fields.text}
                    </a>
                  </Link>
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZSection;
