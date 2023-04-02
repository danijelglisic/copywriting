import React from "react";
import Image from "next/image";
import photo from "../../assets/placeholder.jpg";

const HeroSection = () => {
  return (
    <div className="p-20 bg-secondary relative bg-opacity-70">
      <Image priority className="z-[-1]" src={photo} fill alt="" />
      <div className="flex flex-col items-center text-white py-10 space-y-16">
        <div className="text-center border-t-4 ">
          <h1 className="heading-2">Slaviša Bogdanović</h1>
        </div>
        <div className="text-primary border-b-4 border-primary">
          <h2 className="heading-3">COPYWRITER</h2>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
