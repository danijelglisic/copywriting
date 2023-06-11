import React, { useEffect, useState } from "react";
import { IReels } from "@/@types/generated/contentful";

interface ReelsProps {
  reels: IReels;
}

const Reels = ({ reels }: ReelsProps) => {
  const [isClientRendered, setIsClientRendered] = useState(false);

  useEffect(() => {
    setIsClientRendered(true);
  }, []);

  if (!isClientRendered) return null;

  const { embededReels } = reels.fields;

  if (!embededReels) return <></>;
  return (
    <div className="container py-20">
      <div
        className="grid place-items-center"
        dangerouslySetInnerHTML={{
          __html: embededReels,
        }}
      />
    </div>
  );
};

export default Reels;
