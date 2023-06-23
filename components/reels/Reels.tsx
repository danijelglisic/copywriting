import React, { useEffect, useState } from "react";
import { IReels } from "@/@types/generated/contentful";

declare global {
  interface Window {
    instgrm: any;
  }
}

interface ReelsProps {
  reels: IReels;
}

const Reels = ({ reels }: ReelsProps) => {
  const { embededReels } = reels.fields;

  return (
    <div className="container py-20">
      <div
        className="grid place-items-center"
        dangerouslySetInnerHTML={{
          __html: embededReels || "",
        }}
      />
    </div>
  );
};

export default Reels;
