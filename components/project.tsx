import { motion } from "framer-motion";
import Image from "next/image";
import { FC, useRef, useState } from "react";
import { ProjectProps } from "../types";
import { useWindowSize } from "../hooks/useWindowSize";
import { Video } from "./video";
import classNames from "classnames";

interface Props {
  project: ProjectProps;
  isActive: boolean;
  isHover: boolean;
  zIndex: number;
  projectActive: string | null;
}

export const Project: FC<Props> = ({
  project,
  isActive,
  isHover,
  zIndex,
  projectActive,
}) => {
  const [slide, setSlide] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 0.6, 0.4, 1] }}
      className={classNames(
        "fixed h-screen top-0 transition-[left,width,height] duration-500 bg-cream",
        {
          "left-0": isActive,
          "left-[50vw]": !isActive,
          "w-full": isActive,
          "w-1/2": !isActive,
          [`z-[${zIndex}]`]: !isHover,
          "z-[13]": !isHover && zIndex === 13,
          "z-[12]": !isHover && zIndex === 12,
          "z-[11]": !isHover && zIndex === 11,
          "z-[10]": !isHover && zIndex === 10,
          "z-[9]": !isHover && zIndex === 9,
          "z-[8]": !isHover && zIndex === 8,
          "z-[7]": !isHover && zIndex === 7,
          "z-[6]": !isHover && zIndex === 6,
          "z-[5]": !isHover && zIndex === 5,
          "z-[4]": !isHover && zIndex === 4,
          "z-[3]": !isHover && zIndex === 3,
          "z-[2]": !isHover && zIndex === 2,
          "z-[1]": !isHover && zIndex === 1,
          "z-[200]": isHover,
          "z-[300]": projectActive === project._id,
        }
      )}
    >
      {project?.content &&
        project.content.map((block, index) => {
          const activeSlide = slide === index;
          const secondSlide = slide === index - 1;

          if (project.content)
            return (
              <div
                key={block._key}
                className={classNames(
                  "absolute overflow-hidden transition-all duration-500 bg-red",
                  {
                    "w-[50vw]": !isActive && (activeSlide || secondSlide),
                    "w-[calc(50vw-60px)]":
                      isActive && (activeSlide || secondSlide),
                    "w-0": isActive && (!activeSlide || !secondSlide),
                    "top-0": !isActive,
                    "top-10": isActive,
                    "left-0": !isActive,
                    "left-10": isActive && activeSlide,
                    "left-[calc(50vw+20px)]": isActive && secondSlide,
                    "bottom-0": !isActive,
                    "bottom-10": isActive,
                    "rounded-lg": isActive,
                    "z-[0]": project.content.length - index === 0,
                    "z-[1]": project.content.length - index === 1,
                    "z-[2]": project.content.length - index === 2,
                    "z-[3]": project.content.length - index === 3,
                    "z-[4]": project.content.length - index === 4,
                    "z-[5]": project.content.length - index === 5,
                    "z-[6]": project.content.length - index === 6,
                    "z-[7]": project.content.length - index === 7,
                    "z-[8]": project.content.length - index === 8,
                    "z-[9]": project.content.length - index === 9,
                    "z-[10]": project.content.length - index === 10,
                    "z-[11]": project.content.length - index === 11,
                    "z-[12]": project.content.length - index === 12,
                  }
                )}
              >
                {block.type === "image" && (
                  <Image
                    key={block._key}
                    src={`${block.url}?w=1800`}
                    alt="Project"
                    className="object-cover"
                    priority
                    fill
                    quality={100}
                    sizes="(max-width: 500px) 100vw, (max-width: 500px) 100vw, 100vw"
                  />
                )}
              </div>
            );

          return null;
        })}
    </motion.div>
  );
};
