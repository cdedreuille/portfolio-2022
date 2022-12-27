import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { FC, useLayoutEffect, useRef, useState } from "react";
import { ProjectProps } from "../types";
import classNames from "classnames";
import Image from "next/image";
import { useWindowSize } from "../hooks/useWindowSize";

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
  const scrollRef = useRef<HTMLInputElement>(null);
  const ghostRef = useRef<HTMLInputElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  useLayoutEffect(() => {
    scrollRef.current && setScrollRange(scrollRef.current.scrollWidth);
  }, [scrollRef]);

  const { scrollYProgress } = useScroll({
    container: ghostRef,
  });

  const transform = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);
  const physics = { damping: 15, mass: 0.27, stiffness: 100 };
  const spring = useSpring(transform, physics);
  const { height } = useWindowSize();

  return (
    <motion.div
      className={classNames(
        { [`${project.client}`]: true },
        "absolute h-screen top-0 bg-cyan-600 overflow-hidden",
        {
          [`z-[${zIndex}]`]: !isHover,
          "z-[200]": isHover && projectActive !== project._id,
          "z-[300]": projectActive === project._id,
        }
      )}
    >
      <motion.div
        ref={scrollRef}
        style={{ x: spring }}
        className="w-[10000px] relative h-full bg-cream pointer-events-none"
      >
        <motion.div
          initial={{ y: -40 }}
          animate={{ y: isActive ? 0 : -40 }}
          transition={{ duration: 1.2, ease: [0.5, 0.15, 0.15, 1] }}
          className="h-10 w-[50vw] bg-cream absolute top-0 left-0 z-40"
        />
        <motion.div
          initial={{ y: 40 }}
          animate={{ y: isActive ? 0 : 40 }}
          transition={{ duration: 1.2, ease: [0.5, 0.15, 0.15, 1] }}
          className="h-10 w-[50vw] bg-cream absolute bottom-0 left-0 z-40"
        />
        <motion.div
          initial={{ x: -40 }}
          animate={{ x: isActive ? 0 : -40 }}
          transition={{ duration: 1.2, ease: [0.5, 0.15, 0.15, 1] }}
          className="w-10 bg-cream absolute top-0 bottom-0 left-0 z-40"
        />
        {project?.content && (
          <>
            {project.content.slice(0, 1).map((block) => (
              <motion.div
                key={block._key}
                className={classNames(
                  "absolute w-[50vw] h-screen z-30 bg-orange-700"
                )}
              >
                {block.type === "image" && (
                  <Image
                    key={block._key}
                    src={`${block.url}?w=1800`}
                    alt="Project"
                    priority
                    quality={100}
                    fill
                    className="object-cover"
                  />
                )}
              </motion.div>
            ))}
            <div className="p-10 ml-[50vw] flex flex-row">
              {/* Description */}
              <div className="w-[calc(50vw-80px)] mr-10 bg-white p-10">
                <div className="text-xs sm:text-base">{project.client}</div>
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
              {project.content.map((block, index) => {
                const newHeight = height ? height - 80 : 0;
                const width =
                  block.width && block.height
                    ? (newHeight * block.width) / block.height
                    : height;
                return (
                  <div key={block._key} className="h-full relative mr-10">
                    {block.type === "image" && (
                      <div
                        style={{
                          width,
                          height: newHeight,
                        }}
                        className="bg-red relative"
                      >
                        <Image
                          key={block._key}
                          src={`${block.url}?w=1800`}
                          alt="Project"
                          priority
                          quality={100}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </motion.div>
      <div
        ref={ghostRef}
        className="absolute top-0 left-0 h-screen w-screen overflow-scroll scrollbar-hide"
      >
        <div style={{ height: scrollRange }} className="w-full" />
      </div>
    </motion.div>
  );
};
