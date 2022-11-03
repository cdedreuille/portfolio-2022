import Image from "next/image";
import { FC } from "react";
import { ProjectProps } from "../types";
import MuxPlayer from "@mux/mux-player-react/lazy";
import { Video } from "./video";

interface Props {
  project: ProjectProps;
}

export const Project: FC<Props> = ({ project }) => {
  return (
    <div className="border-t border-black mb-64 pt-2">
      <div className="flex justify-between mb-12">
        <div className="text-base">{project.published_at}</div>
        <div className="uppercase text-sm">{project.type}</div>
      </div>
      <div className="text-2xl mb-12">
        {project.client} - {project.name}
      </div>
      {project.blocks?.map((block) => (
        <div key={block._key} className="mb-8 flex flex-row gap-8">
          {block.assets?.map((asset) => {
            if (asset.type === "image") {
              return (
                <div key={asset._key}>
                  {asset.url && (
                    <Image
                      src={asset.url}
                      width={asset.width}
                      height={asset.height}
                      alt="Image"
                    />
                  )}
                </div>
              );
            }
            if (asset.type === "mux") {
              return <Video asset={asset} key={asset._key} />;
            }
            return null;
          })}
        </div>
      ))}
      {project.blocks === null && (
        <div className="w-full h-[800px] bg-white rounded-md" />
      )}
    </div>
  );
};
