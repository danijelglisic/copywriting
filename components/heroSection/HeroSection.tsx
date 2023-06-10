import React from "react";
import Image from "next/image";
import photo from "../../assets/placeholder.jpg";
import { Variants, motion } from "framer-motion";

const name: Variants = {
  offscreen: {
    y: -300,
  },
  onscreen: {
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const position: Variants = {
  offscreen: {
    y: 300,
  },
  onscreen: {
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const HeroSection = () => {
  return (
    <div className="p-20 lg:p-40 bg-secondary relative bg-opacity-70">
      <Image priority className="z-[-1] object-cover" src={photo} fill alt="" />
      <div className="flex flex-col items-center text-white py-10 space-y-16 overflow-hidden">
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true }}
        >
          <motion.div variants={name}>
            <div className="text-center border-t-4 ">
              <h1 className="heading-2">Slaviša Bogdanović</h1>
            </div>
          </motion.div>
        </motion.div>
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true }}
        >
          <motion.div variants={position}>
            <div className="text-primary border-b-4 border-primary">
              <h2 className="heading-3">COPYWRITER</h2>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
