import React, { FC } from "react";
import { motion } from "framer-motion";
import classNames from "classnames";

interface Props {
  children: string;
  aboutState: "closed" | "hover" | "active";
}

const AnimatedName: FC<Props> = ({ children, aboutState }) => {
  const letters = Array.from(children);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 1 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="inline-flex flex-row mr-2 flex-wrap font-sans text-2xl fixed top-0 left-0 pt-8 pl-8 z-30"
    >
      {letters.map((letter, index) => (
        <div key={index} className="overflow-hidden">
          <motion.div
            variants={child}
            className={classNames(
              "inline-block text-black transition-colors duration-300",
              { "text-black": aboutState !== "active" },
              { "text-white": aboutState === "active" }
            )}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.div>
        </div>
      ))}
    </motion.div>
  );
};

export default AnimatedName;
