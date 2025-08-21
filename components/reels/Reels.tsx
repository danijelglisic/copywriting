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
  const fields = reels.fields as any; // Temporary fix for type issue
  const { embededReels } = fields;

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
