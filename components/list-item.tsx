import classNames from "classnames";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import Image from "next/image";
import { FC, useEffect, useRef } from "react";
import { ProjectProps } from "types";
import { useGlobal } from "./global-provider";
import Link from "next/link";

interface ItemProps {
  project: ProjectProps;
  color: string;
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
    transition: { duration: 0.6, ease: "easeInOut" as const },
  },
};

export const Item: FC<ItemProps> = ({ project, color, isFirst, isLast }) => {
  const { setActiveProject, setActivePreview, activePreview } = useGlobal();
  const ref = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["1 1", "0 0"],
  });

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (latest > 0.46 && latest < 0.54) {
        setActivePreview(project);
      }
      if (isFirst && latest < 0.46) setActivePreview(null);
      if (isLast && latest > 0.54) setActivePreview(null);
    });
  }, [isFirst, isLast, project, scrollYProgress, setActivePreview]);

  const isActive = activePreview?.slug === project.slug;

  const onClick = () => {
    setActiveProject(project);
  };

  return (
    <Link
      href={`/${project.slug}`}
      transitionTypes={["nav-forward"]}
      onClick={onClick}
      className="group block h-20 sn:h-28 relative overflow-hidden mx-4 sm:mx-12 mb-2 rounded-lg"
      ref={ref}
    >
      <div className="relative z-10 flex items-center gap-8 py-2 pl-4 pr-2 sm:px-8 h-full">
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
          <div className="text-gray-500 sm:text-black font-mono uppercase relative">
            {project.name}
            <div className="absolute w-0 h-px -bottom-1 left-0 bg-black group-hover:w-full transition-all duration-300" />
          </div>
        </div>
        <div className="hidden md:flex gap-4">
          {project.tags &&
            project.tags.map((tag, index) => (
              <div
                key={tag.slug}
                className={classNames(
                  "font-mono uppercase text-sm border border-gray-400 text-gray-400 rounded-full px-4 py-1",
                  index > 0 && "hidden lg:block"
                )}
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
    </Link>
  );
};
