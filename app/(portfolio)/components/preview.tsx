"use client";

import Image from "next/image";
import { FC } from "react";
import { ProjectProps } from "types";
import MuxVideo from "@mux/mux-video-react";
import { useGlobal } from "./global-provider";
import { motion } from "framer-motion";

interface ItemProps {
  projects: ProjectProps[];
}

export const Preview: FC<ItemProps> = ({ projects }) => {
  const { activePreview, setActivePreview } = useGlobal();

  const activeProject = projects.find(
    (project) => project._id === activePreview
  );

  console.log(activePreview);

  // if (!activePreview) return null;

  console.log(activePreview);

  return (
    <motion.div
      initial={{ opacity: 0, x: 800, y: "-50%" }}
      animate={{ opacity: 1, x: activePreview ? 0 : 800 }}
      className="fixed bottom-2 right-2 md:top-1/2 md:-translate-y-1/2 md:right-[8vw] w-40 h-64 md:w-[40vw] md:h-[60vh] z-30 rounded-2xl overflow-hidden"
      style={{ backgroundColor: activeProject?.backgroundColor?.hex || "#fff" }}
    >
      {projects.map((project) => (
        <div
          key={project._id}
          className="absolute w-full h-full"
          style={{ zIndex: activePreview === project._id ? 10 : 1 }}
        >
          {project?.preview?.type === "image" && project.preview.image?.url && (
            <Image
              src={`${project.preview.image.url}?w=960`}
              alt="Project"
              className="object-cover"
              priority
              fill
              quality={100}
              sizes="(max-width: 500px) 100vw, (max-width: 500px) 100vw, 100vw"
            />
          )}
          {project?.preview?.type === "video" &&
            project.preview.video?.playbackId && (
              <MuxVideo
                style={{ height: "100%", width: "100%", objectFit: "cover" }}
                playbackId={project.preview.video.playbackId}
                streamType="on-demand"
                controls={false}
                autoPlay
                muted
                loop
              />
            )}
        </div>
      ))}
      {/* {activeProject?.preview?.type === "image" &&
        activeProject.preview.image?.url && (
          <Image
            src={`${activeProject.preview.image.url}?w=1800`}
            alt="Project"
            className="object-cover"
            priority
            fill
            quality={100}
            sizes="(max-width: 500px) 100vw, (max-width: 500px) 100vw, 100vw"
          />
        )}
      {activeProject?.preview?.type === "video" &&
        activeProject.preview.video?.playbackId && (
          <MuxVideo
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
            playbackId={activeProject.preview.video.playbackId}
            streamType="on-demand"
            controls={false}
            autoPlay
            muted
            loop
          />
        )} */}
    </motion.div>
  );
};
