"use client";

import { AnimatePresence, motion, useScroll } from "framer-motion";
import Image from "next/image";
import { FC, useEffect, useRef } from "react";
import { ProjectProps } from "types";
import MuxVideo from "@mux/mux-video-react";
import { useGlobal } from "./global-provider";

interface ItemProps {
  project: ProjectProps;
  color: string;
  activeLine: string | null;
  setActiveLine: (project: string | null) => void;
  isFirst: boolean;
  isLast: boolean;
}

const variants = {
  visible: {
    opacity: 1,
    transition: { duration: 0 },
  },
  hidden: {
    opacity: 0,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

export const Item: FC<ItemProps> = ({
  project,
  color,
  activeLine,
  setActiveLine,
  isFirst,
  isLast,
}) => {
  const { setActiveProject } = useGlobal();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["1 1", "0 0"],
  });

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (latest > 0.46 && latest < 0.54) {
        setActiveLine(project._id);
      }
      if (isFirst && latest < 0.46) setActiveLine(null);
      if (isLast && latest > 0.54) setActiveLine(null);
    });
  }, [isFirst, isLast, project._id, scrollYProgress, setActiveLine]);

  const isActive = activeLine === project._id;

  const onClick = () => {
    setActiveProject(project.slug);
  };

  return (
    <div
      onClick={onClick}
      className="group block h-20 sn:h-28 relative overflow-hidden sm:mx-12 mb-2 rounded-lg"
      ref={ref}
    >
      {/* Preview */}
      <div
        className="fixed bottom-2 right-2 md:top-1/2 md:-translate-y-1/2 md:right-[8vw] w-40 h-64 md:w-[40vw] md:h-[60vh] z-30 rounded-2xl overflow-hidden"
        style={{ backgroundColor: color, opacity: isActive ? 1 : 0 }}
      >
        {project.preview?.type === "image" && project.preview.image?.url && (
          <Image
            src={`${project.preview.image.url}?w=1800`}
            alt="Project"
            className="object-cover"
            priority
            fill
            quality={100}
            sizes="(max-width: 500px) 100vw, (max-width: 500px) 100vw, 100vw"
          />
        )}
        {project.preview?.type === "video" &&
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

      {/* Line */}
      <div className="relative z-10 flex items-center gap-8 py-2 px-6 sm:px-8 h-full">
        <div className="text-md w-[220px] hidden sm:flex font-mono uppercase text-sm sm:text-md h-full items-center relative">
          <AnimatePresence>
            {(!isActive || (isActive && !project.client.logoList?.url)) && (
              <motion.div
                initial={{ opacity: 0, y: -80 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -80 }}
              >
                {project.client.name}
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {isActive && project.client.logoList?.url && (
              <motion.div
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 80 }}
                className="absolute"
                style={{
                  width: project.client.logoWidthList,
                  height: project.client.logoHeightList,
                }}
              >
                <Image
                  src={project.client.logoList?.url}
                  alt={project.client.name}
                  fill
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="text-sm sm:text-md flex flex-col">
          <div className="sm:hidden font-mono uppercase">
            {project.client.name}
          </div>
          <div className="text-gray-500 sm:text-black font-mono uppercase">
            {project.name}
          </div>
        </div>
        <div className="hidden sm:flex gap-4">
          {project.tags &&
            project.tags.map((tag) => (
              <div
                key={tag._id}
                className="font-mono uppercase text-sm border border-gray-400 text-gray-400 rounded-full px-4 py-1"
              >
                {tag.name}
              </div>
            ))}
        </div>
      </div>
      <motion.div
        variants={variants}
        animate={isActive ? "visible" : "hidden"}
        initial="hidden"
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="absolute w-full h-full top-0 left-0"
        style={{ backgroundColor: color }}
      />
    </div>
  );
};
