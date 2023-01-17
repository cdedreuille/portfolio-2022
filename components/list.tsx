import { AnimatePresence, motion, useScroll } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useRef, useState } from "react";
import { ProjectProps } from "../types";
import Gradient from "javascript-color-gradient";
import useSound from "use-sound";

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
        className="fixed bottom-2 right-2 md:top-1/2 md:-translate-y-1/2 md:right-[8vw] w-40 h-64 md:w-[40vw] md:h-[60vh] bg-emerald-200 z-30 rounded-2xl overflow-hidden"
        style={{ backgroundColor: color }}
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
      </motion.div>

      {/* Coloured line */}
      <Link
        href={`?project=${project.slug}`}
        scroll={false}
        as={`/${project.slug}`}
        className="group block h-28 relative overflow-hidden mx-12 mb-2 rounded-lg"
        ref={ref}
      >
        <div className="relative z-10 flex items-center gap-8 py-2 px-6 sm:px-8 h-full">
          <div className="text-md w-[220px] hidden sm:flex font-mono uppercase h-full items-center relative">
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
          <div className="text-md flex flex-col">
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
      </Link>
    </>
  );
};

export const List: FC<Props> = ({ data }) => {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const colorArr = new Gradient()
    .setColorGradient("#FFEB84", "#FFC799", "#E59DE5", "#CBE4EA", "#448EEF")
    .setMidpoint(data.length)
    .getColors();
  const colorArr2 = new Gradient()
    .setColorGradient("#0000ff", "#ff3300")
    .setMidpoint(data.length)
    .getColors();
  const colorArr3 = new Gradient()
    .setColorGradient("#FEC462", "#FE2D20")
    .setMidpoint(data.length)
    .getColors();
  const colorArr4 = new Gradient()
    .setColorGradient(
      "#1c5acd",
      "#1ccdbb",
      "#f7b518",
      "#f7b518",
      "#ec881d",
      "#fd3300"
    )
    .setMidpoint(data.length)
    .getColors();

  const colorArr5 = new Gradient()
    .setColorGradient(
      "#fcc5e4",
      "#fda34b",
      "#ff7882",
      "#c8699e",
      "#7046aa",
      "#0c1db8",
      "#020f75"
    )
    .setMidpoint(data.length)
    .getColors();

  const colorArr6 = new Gradient()
    .setColorGradient("#ffc320", "#fe1f1f")
    .setMidpoint(data.length)
    .getColors();

  const colorArr7 = new Gradient()
    .setColorGradient("#0004ff", "#fe1f1f", "#fe1f1f", "#fee81f")
    .setMidpoint(data.length)
    .getColors();

  const colorArr8 = new Gradient()
    .setColorGradient("#EBEEF3", "#EBEEF3")
    .setMidpoint(data.length)
    .getColors();

  const [play] = useSound("/click-21156.mp3");

  useEffect(() => {
    play();
  }, [activeProject, play]);

  return (
    <div className="md:mt-20 mb-40">
      {data.map((project, index) => (
        <Item
          key={project._id}
          isFirst={index === 0}
          isLast={index === data.length - 1}
          project={project}
          color={colorArr8[index]}
          activeProject={activeProject}
          setActiveProject={setActiveProject}
        />
      ))}
    </div>
  );
};
