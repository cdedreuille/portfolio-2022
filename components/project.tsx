import { motion } from "framer-motion";
import Image from "next/image";
import { FC, KeyboardEvent, useEffect, useRef, useState } from "react";
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

const variants = {
  firstClosed: { width: "50vw", left: 0 },
  first: {
    width: "calc(50vw - 60px)",
    left: 40,
  },
  second: {
    width: "calc(50vw - 60px)",
    left: "calc(50vw + 20px)",
  },
  before: {
    width: 0,
    left: 0,
  },
  after: {
    width: 0,
    left: "100vw",
  },
  inactive: {
    top: 0,
    bottom: 0,
    borderRadius: 0,
  },
  active: {
    top: 40,
    bottom: 40,
    borderRadius: 8,
  },
};

export const Project: FC<Props> = ({
  project,
  isActive,
  isHover,
  zIndex,
  projectActive,
}) => {
  const [slide, setSlide] = useState(0);
  const [shouldNext, setShouldNext] = useState(true);

  const handleKeyboardEvent = (e: KeyboardEvent<HTMLImageElement>) => {
    if (shouldNext) {
      if (e.code === "ArrowRight") {
        if (project.content && slide === project.content.length - 1) return;
        setSlide((slide) => slide + 1);
      }
      if (e.code === "ArrowLeft") {
        if (slide === 0) return;
        setSlide((slide) => slide - 1);
      }
    }
    setShouldNext(false);
    setTimeout(() => setShouldNext(true), 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 0.6, 0.4, 1] }}
      onKeyDown={handleKeyboardEvent}
      tabIndex={0}
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
          const beforeSlide = index < slide;
          const activeSlide = slide === index;
          const secondSlide = slide === index - 1;
          const afterSlide = index > slide + 1;

          const theVariant = () => {
            if (isActive) {
              if (beforeSlide) return ["before", "active"];
              if (activeSlide) return ["first", "active"];
              if (secondSlide) return ["second", "active"];
              if (afterSlide) return ["after", "active"];
            }
            if (beforeSlide) return ["before", "inactive"];
            if (activeSlide) return ["firstClosed", "inactive"];
            if (secondSlide) return ["second", "inactive"];
            if (afterSlide) return ["after", "inactive"];
          };

          if (project.content)
            return (
              <motion.div
                key={block._key}
                initial={false}
                animate={theVariant()}
                transition={{ duration: 0.6 }}
                variants={variants}
                className={classNames("absolute overflow-hidden bg-red", {
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
                })}
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
              </motion.div>
            );

          return null;
        })}
    </motion.div>
  );
};
