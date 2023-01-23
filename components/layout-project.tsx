import React, { FC } from "react";
import { motion } from "framer-motion";
import { ProjectProps } from "types";
import { useGlobal } from "./global-provider";

interface Props {
  children: React.ReactNode;
  project?: ProjectProps;
}

const variants = {
  visible: {},
  hidden: {},
};

const enter = {
  visible: { width: 0 },
  hidden: { width: "100vw" },
};

const exit = {
  visible: { width: 0 },
  hidden: { width: "100vw" },
};

const flow = {
  visible: { x: 0 },
  hidden: { x: -100 },
};

const textWrapper = {
  visible: {
    transition: { staggerChildren: 0.04 },
  },
  hidden: {
    transition: { staggerChildren: 0.04 },
  },
};

const letter = {
  visible: {
    y: 0,
    transition: {
      type: "spring",
      damping: 18,
      stiffness: 100,
    },
  },
  hidden: {
    y: 200,
    transition: {
      type: "spring",
      damping: 18,
      stiffness: 100,
    },
  },
};

const Layout: FC<Props> = ({ children, project }) => {
  const { activeProject } = useGlobal();

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

  const duration = 1;

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div
        variants={enter}
        initial="hidden"
        animate="visible"
        transition={{ duration, ease: "easeInOut", delay: 2 }}
        className="fixed z-50 h-screen top-0 left-0 bottom-0 overflow-hidden"
        style={{
          backgroundColor: activeProject?.backgroundColor?.hex || "#000",
        }}
      >
        <motion.div
          variants={textWrapper}
          initial="hidden"
          animate="visible"
          className="absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center sm:justify-center font-serif uppercase text-titleSmSm mb-16 md:mb-24"
          style={{ fontFeatureSettings: '"dlig" 1,"kern" 1' }}
        >
          {letters().map((item, index) => (
            <div key={index} className="overflow-hidden">
              <motion.div
                variants={letter}
                className="inline-block"
                style={{ color: project?.primaryColor?.hex || "#000000" }}
              >
                {item === " " ? "\u00A0" : item}
              </motion.div>
            </div>
          ))}
        </motion.div>
      </motion.div>
      <motion.div
        variants={exit}
        initial="visible"
        animate="visible"
        exit="hidden"
        transition={{ duration, ease: "easeInOut" }}
        className="fixed z-50 h-screen top-0 right-0 bottom-0"
        style={{
          backgroundColor: activeProject?.backgroundColor?.hex || "#000",
        }}
      />
      <motion.div
        variants={flow}
        initial="visible"
        animate="visible"
        exit="hidden"
        transition={{ duration, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default Layout;
