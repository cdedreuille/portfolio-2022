import { motion } from "framer-motion";
import { FC, KeyboardEvent, useEffect, useRef, useState } from "react";
import { ProjectProps } from "../types";
import classNames from "classnames";
import { Slide } from "./slide";
import Image from "next/image";

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
  const [shouldNext, setShouldNext] = useState(true);

  const handleKeyboardEvent = (e: KeyboardEvent<HTMLImageElement>) => {
    if (shouldNext) {
      if (e.code === "ArrowRight") {
        if (project.content && slide === project.content.length - 2) return;
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
      {project?.content && (
        <>
          {project.content.slice(0, 1).map((block, index) => (
            <Slide
              key={block._key}
              project={project}
              isActive={isActive}
              slide={slide}
              index={index}
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
            </Slide>
          ))}
          <Slide project={project} isActive={isActive} slide={slide} index={1}>
            <div className="justify-center h-full w-[calc(50vw-60px)] bg-white p-10">
              <div className="text-xs sm:text-base">{project.client.name}</div>
              <div className="text-2xl sm:text-4xl font-bold mt-2">
                {project.name}
              </div>
              <div className="flex flex-row gap-4 mt-8">
                {project.tags &&
                  project.tags.map((tag) => (
                    <div
                      key={tag._id}
                      className="text-sm border border-black rounded-full px-4 py-2"
                    >
                      {tag.name}
                    </div>
                  ))}
              </div>
              <div className="text-md mt-8 max-w-2xl">
                {project.description}
              </div>
            </div>
          </Slide>
          {project.content.slice(1).map((block, index) => (
            <Slide
              key={block._key}
              project={project}
              isActive={isActive}
              slide={slide}
              index={index + 2}
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
            </Slide>
          ))}
        </>
      )}
    </motion.div>
  );
};
