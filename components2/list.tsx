import { motion, useScroll } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useRef, useState } from "react";
import { ProjectProps } from "../types";

interface Props {
  data: ProjectProps[];
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
    color: "#fff",
    transition: { duration: 0 },
  },
  hidden: {
    color: "#000",
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

interface ItemProps {
  project: ProjectProps;
  color: string;
  activeProject: string | null;
  setActiveProject: (project: string | null) => void;
}

const Item: FC<ItemProps> = ({
  project,
  color,
  activeProject,
  setActiveProject,
}) => {
  // const [isActive, setIsActive] = useState(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["1 1", "0 0"],
  });

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (latest > 0.46 && latest < 0.54) {
        // setIsActive(true);
        setActiveProject(project._id);
      } else {
        // setIsActive(false);
      }
    });
  }, [project._id, scrollYProgress, setActiveProject]);

  const isActive = activeProject === project._id;

  return (
    <>
      {/* Preview */}
      <motion.div
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0, ease: "easeInOut" }}
        className="fixed top-1/2 -translate-y-1/2 right-6 w-[460px] h-[520px] bg-emerald-200 z-30 rounded-2xl overflow-hidden"
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
        className="block h-20 relative mb-2 mx-12 rounded-lg overflow-hidden"
        ref={ref}
      >
        <div className="relative z-10 flex justify-between items-center gap-8 py-2 px-8 h-full">
          <motion.div
            variants={colorVariants}
            animate={isActive ? "visible" : "hidden"}
            initial="hidden"
            transition={{ duration: 0, ease: "easeInOut" }}
            className="text-xs sm:text-base"
          >
            {project.client} - {project.name}
          </motion.div>
          <div className="uppercase text-xs sm:text-sm">
            {project.tags && project.tags[0].name}
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
  const colors = [
    "#FEA8BD",
    "#E99CBF",
    "#D791C1",
    "#CA8AC2",
    "#B980C3",
    "#A977C4",
    "#9A6EC6",
    "#8A65C7",
    "#7A5CC8",
    "#6A52CA",
    "#5A4ACB",
    "#4C41CC",
    "#3B38CD",
    "#272CCF",
  ];
  return (
    <div>
      {data.map((project, index) => (
        <Item
          key={project._id}
          project={project}
          color={colors[index]}
          activeProject={activeProject}
          setActiveProject={setActiveProject}
        />
      ))}
    </div>
  );
};
