"use client";

import { useScroll, motion, useTransform } from "framer-motion";
import Image from "next/image";
import { FC, useRef } from "react";
import { ProjectProps } from "../types";
import { useWindowSize } from "../hooks/useWindowSize";
import { Video } from "./video";

interface Props {
  project: ProjectProps;
}

export const Project: FC<Props> = ({ project }) => {
  const ref = useRef(null);
  const { width } = useWindowSize();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"],
  });

  const colorBorder = useTransform(
    scrollYProgress,
    [1, 0.98],
    ["#000", "#F3F2F3"]
  );
  const opacityText = useTransform(scrollYProgress, [1, 0.9], [0, 1]);
  const opacityLine = useTransform(scrollYProgress, [1, 0.99], [0, 1]);

  return (
    <div className="relative" ref={ref}>
      <div id={project.slug} />
      <motion.div
        className="sticky top-0 bg-cream border-t border-black z-30"
        style={{ borderColor: colorBorder }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          className="w-full h-2 bg-cream absolute -top-1 left-0"
          style={{ opacity: opacityLine }}
        />
        <div className="flex justify-between items-center py-2 bg-cream">
          <div className="text-base">{project.published_at.slice(0, 4)}</div>
          {width && width > 768 && (
            <motion.div
              initial={{ opacity: 0 }}
              className="text-base"
              style={{ opacity: opacityText }}
            >
              {project.client} - {project.name}
            </motion.div>
          )}
          <div className="uppercase text-sm">{project.type}</div>
        </div>
      </motion.div>
      <div className="pb-8 origin-top-left text-2xl sm:text-3xl">
        {project.client} - {project.name}
      </div>
      <div className="max-w-6xl mb-12">{project.description}</div>
      {project.blocks?.map((block) => (
        <div key={block._key} className="mb-8 flex flex-row gap-8">
          {block.assets?.map((asset) => {
            if (asset.type === "image") {
              return (
                <div key={asset._key}>
                  {asset.url && (
                    <Image
                      src={`${asset.url}?w=1800`}
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
      <div className="w-full h-[100px] bg-cream" />
    </div>
  );
};
