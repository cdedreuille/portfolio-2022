import Image from "next/image";
import { FC } from "react";
import { ProjectProps } from "types";
import MuxVideo from "@mux/mux-video-react";
import { motion } from "framer-motion";
import { useWindowSize } from "hooks/useWindowSize";

interface ItemProps {
  projects: ProjectProps[];
  activePreview: ProjectProps | null;
}

export const Preview: FC<ItemProps> = ({ projects, activePreview }) => {
  const { width } = useWindowSize();

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: width && width > 768 ? 1200 : 300,
        y: width && width > 768 ? "50%" : 0,
      }}
      animate={{
        opacity: 1,
        x: activePreview ? 0 : width && width > 768 ? 1200 : 300,
        y: width && width > 768 ? "50%" : 0,
      }}
      className="fixed bottom-2 right-2 md:bottom-1/2 md:right-[8vw] w-40 h-64 md:w-[40vw] md:h-[60vh] z-[400] rounded-2xl overflow-hidden"
      style={{ backgroundColor: activePreview?.backgroundColor?.hex || "#fff" }}
    >
      {projects.map((project) => (
        <div
          key={project._id}
          className="absolute w-full h-full"
          style={{ zIndex: activePreview?._id === project._id ? 10 : 1 }}
        >
          {project?.preview?.type === "image" && project.preview.image?.url && (
            <Image
              src={`${project.preview.image.url}?w=1200`}
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
    </motion.div>
  );
};
