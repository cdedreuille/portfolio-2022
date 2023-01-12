"use client";

import { FC } from "react";
import { AssetProps } from "../types";
import MuxPlayer from "@mux/mux-player-react";
import useIsMounted from "../hooks/useIsMounted";

interface Props {
  asset: AssetProps;
}

export const Video: FC<Props> = ({ asset }) => {
  const isMounted = useIsMounted();

  if (!isMounted) return null;

  return (
    <div className="w-full">
      <MuxPlayer
        playbackId={asset.playbackId}
        streamType="on-demand"
        muted
        autoPlay
        loop
        // @ts-ignore
        style={{ width: "100%", "--controls": "none" }}
      />
    </div>
  );
};
