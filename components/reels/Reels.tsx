import React, { useEffect, useState } from "react";
import { IReels } from "@/@types/generated/contentful";

interface ReelsProps {
  reels: IReels;
}

const Reels = ({ reels }: ReelsProps) => {
  const [firstRender, setFirstRender] = useState(false);
  const { embededReels } = reels.fields;
  const fixedEmbed = embededReels;

  useEffect(() => {
    setFirstRender(true);
    if (!window) return;
    window.instgrm.Embeds.process();
  }, []);
  if (!firstRender) null;

  if (!fixedEmbed) return <></>;
  return (
    <div className="container py-20">
      <div
        className="grid place-items-center"
        dangerouslySetInnerHTML={{
          __html: fixedEmbed,
        }}
      />
    </div>
  );
};

export default Reels;
