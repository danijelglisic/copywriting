import React from "react";
import Image from "next/image";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { FadeUp } from "@/components/ui/FadeUp";

interface HeroSectionProps {
  heading?: string;
  description?: string;
}

const HeroSection = ({
  heading = "Slavisa Bogdanovic",
  description = "COPYWRITER",
}: HeroSectionProps) => {
  return (
    <div className="p-20 lg:p-40 bg-navy relative bg-opacity-70 overflow-hidden">
      <Image
        priority
        className="z-[-1] object-cover"
        src="/placeholder.jpg"
        fill
        alt=""
      />
      <div className="flex flex-col items-center text-white py-10 space-y-16">
        <div className="text-center border-t-4">
          <h1 className="heading-2">
            <AnimatedText text={heading} />
          </h1>
        </div>
        <FadeUp delay={0.3} className="text-primary border-b-4 border-primary">
          <h2 className="heading-3">{description}</h2>
        </FadeUp>
      </div>
    </div>
  );
};

export default HeroSection;
