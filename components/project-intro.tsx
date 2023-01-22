import { motion } from "framer-motion";
import { FC } from "react";
import { ProjectProps } from "types";
import { useGlobal } from "./global-provider";

interface Props {
  projects: ProjectProps[] | null;
}

const container = {
  visible: {
    opacity: 0,
    transition: { staggerChildren: 0.04, delayChildren: 0.4 },
  },
  hidden: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.4 },
  },
};

const child = {
  hidden: {
    y: 0,
    transition: {
      type: "spring",
      damping: 18,
      stiffness: 100,
    },
  },
  visible: {
    y: 200,
    transition: {
      type: "spring",
      damping: 18,
      stiffness: 100,
    },
  },
};

const variants2 = {
  visible: { width: "100vw", height: 0, bottom: 0, left: 0 },
  hidden: { height: "100vh" },
};

export const ProjectIntro: FC<Props> = ({ projects }) => {
  const { activeProject } = useGlobal();
  // const project = projects?.find((p) => p.slug === activeProject);
  const project = projects[0];

  console.log(activeProject);

  console.log(projects);

  const letters = () => {
    let letters: string[] | null = null;

    if (project?.client.name === "Deliveroo")
      letters = ["D", "E", "Li", "V", "E", "Ro", "O"];
    if (project?.client.name === "Meta") letters = ["M", "E", "T", "A"];
    if (project?.client.name === "Christian Louboutin") {
      const first = ["C", "H", "Ri", "S", "T", "I", "A", "N"];
      const second = ["Lo", "U", "Bo", "U", "T", "I", "N"];
      letters = [...first, " ", ...second];
    }
    if (project?.client.name === "Daisie") letters = ["D", "Ai", "S", "I", "E"];
    if (project?.client.name === "Docent") letters = ["D", "OC", "E", "N", "T"];
    if (project?.client.name === "La Surprise")
      letters = ["La", " ", "S", "U", "R", "P", "Ri", "S", "E"];
    if (project?.client.name === "Floom") letters = ["F", "Lo", "O", "M"];
    if (project?.client.name === "Coca-Cola")
      letters = ["C", "O", "C", "A", "-", "C", "O", "L", "A"];
    if (project?.client.name === "Institut des Mutations") {
      const first = ["I", "N", "S", "T", "I", "T", "UT", " ", "D", "E", "S"];
      const second = ["M", "U", "T", "A", "T", "I", "O", "N", "S"];
      letters = [...first, " ", ...second];
    }
    if (project?.client.name === "CoutureLab")
      letters = ["Co", "U", "T", "U", "R", "E", "LA", "B"];
    if (project?.client.name === "Field.io")
      letters = ["F", "I", "E", "LD", ".", "I", "O"];

    return letters || ["P", "Ro", "J", "E", "C", "T"];
  };

  return (
    <>
      <motion.div
        variants={variants2}
        initial="visible"
        animate="visible"
        exit="hidden"
        transition={{ duration: 0.6 }}
        className="fixed z-[990] overflow-hidden"
        style={{
          backgroundColor: project.backgroundColor?.hex || "#F4F6FA",
        }}
      >
        <motion.div
          variants={container}
          initial="visible"
          animate="visible"
          exit="hidden"
          className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center sm:justify-center font-serif uppercase text-titleSmSm mb-16 md:mb-24"
          style={{ fontFeatureSettings: '"dlig" 1,"kern" 1' }}
        >
          {letters().map((letter, index) => (
            <div key={index} className="overflow-hidden">
              <motion.div
                variants={child}
                className="inline-block"
                style={{ color: project?.primaryColor?.hex || "#000000" }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.div>
            </div>
          ))}
        </motion.div>
      </motion.div>
      {/* <AnimatePresence>
        {activeProject && project && isDone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed top-0 left-0 right-0 bottom-0 z-[999] w-full overflow-scroll"
          >
            <Project project={project} />
          </motion.div>
        )}
      </AnimatePresence> */}
      {/* <AnimatePresence>
        {activeProject && project && (
          <motion.div
            className="fixed z-[990] overflow-hidden"
            initial={{
              width: "100vw",
              height: 0,
              bottom: 0,
              left: 0,
            }}
            animate={{
              height: "100vh",
            }}
            exit={{
              opacity: 0,
            }}
            transition={{ duration: 0.6 }}
            style={{
              backgroundColor: project.backgroundColor?.hex || "#F4F6FA",
            }}
          >
            <motion.div
              variants={container}
              initial="hidden"
              animate={
                activeProject && project && !isDone ? "visible" : "hidden"
              }
              className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center sm:justify-center font-serif uppercase text-titleSmSm mb-16 md:mb-24"
              style={{ fontFeatureSettings: '"dlig" 1,"kern" 1' }}
            >
              {letters().map((letter, index) => (
                <div key={index} className="overflow-hidden">
                  <motion.div
                    variants={child}
                    className="inline-block"
                    style={{ color: project.primaryColor?.hex || "#000000" }}
                    onAnimationComplete={() =>
                      index === letters().length - 1 && setIsDone(true)
                    }
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence> */}
    </>
  );
};
