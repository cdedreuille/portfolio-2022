import { motion, useScroll } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useRef, useState } from "react";
import { ProjectProps } from "../types";

interface Props {
  data: ProjectProps[];
}

interface ItemProps {
  project: ProjectProps;
  color: string;
  activeProject: string | null;
  setActiveProject: (project: string | null) => void;
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

const colorVariants = {
  visible: {
    color: "#000",
    transition: { duration: 0 },
  },
  hidden: {
    color: "rgba(0, 0, 0, 0.4)",
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

const colors = [
  "#FFEB84",
  "#FFDD8D",
  "#FFD194",
  "#FEC59C",
  "#F8BAB0",
  "#F0AEC6",
  "#E9A2DC",
  "#E1A9E6",
  "#DABDE7",
  "#D2D1E9",
  "#C8E2EB",
  "#99C5F1",
  "#6BA8F7",
  "#448EEF",
];

const Item: FC<ItemProps> = ({
  project,
  color,
  activeProject,
  setActiveProject,
  isFirst,
  isLast,
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["1 1", "0 0"],
  });

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (latest > 0.46 && latest < 0.54) {
        setActiveProject(project._id);
      }
      if (isFirst && latest < 0.46) setActiveProject(null);
      if (isLast && latest > 0.54) setActiveProject(null);
    });
  }, [isFirst, isLast, project._id, scrollYProgress, setActiveProject]);

  const isActive = activeProject === project._id;

  return (
    <>
      {/* Preview */}
      <motion.div
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0, ease: "easeInOut" }}
        className="fixed top-1/2 -translate-y-1/2 right-2 md:right-24 w-40 h-64 md:w-[460px] md:h-[520px] bg-emerald-200 z-30 rounded-2xl overflow-hidden"
        style={{ backgroundColor: color }}
      >
        {project.content && (
          <Image
            src={`${project.content[0].url}?w=1800`}
            alt="Project"
            className="object-cover"
            priority
            fill
            quality={100}
            sizes="(max-width: 500px) 100vw, (max-width: 500px) 100vw, 100vw"
          />
        )}
      </motion.div>

      {/* Coloured line */}
      <Link
        href={`/?project=${project.slug}`}
        as={`/${project.slug}`}
        className="block h-20 relative mb-2 sm:mx-4 md:mx-12 sm:rounded-lg overflow-hidden"
        ref={ref}
      >
        <div className="relative z-10 flex items-center gap-8 py-2 px-6 sm:px-8 h-full">
          <div className="text-md hidden md:block">2022</div>
          <div className="text-md w-[132px] hidden sm:block">
            {project.tags && project.tags[0].name}
          </div>
          <div className="text-md w-[168px] hidden sm:block">
            {project.client}
          </div>
          <div className="text-md flex flex-col">
            <div className="sm:hidden">{project.client}</div>
            <motion.div
              variants={colorVariants}
              animate={isActive ? "visible" : "hidden"}
              initial="hidden"
              className="text-gray-500 sm:text-black"
            >
              {project.name}
            </motion.div>
          </div>
        </div>
        <motion.div
          variants={variants}
          animate={isActive ? "visible" : "hidden"}
          initial="hidden"
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute w-full h-full top-0 left-0 bg-emerald-200"
          style={{ backgroundColor: color }}
        />
      </Link>
    </>
  );
};

export const List: FC<Props> = ({ data }) => {
  const [activeProject, setActiveProject] = useState<string | null>(null);

  return (
    <div>
      {data.map((project, index) => (
        <Item
          key={project._id}
          isFirst={index === 0}
          isLast={index === data.length - 1}
          project={project}
          color={colors[index]}
          activeProject={activeProject}
          setActiveProject={setActiveProject}
        />
      ))}
    </div>
  );
};
