import React, { FC } from "react";
import { motion } from "framer-motion";
import classNames from "classnames";

interface Props {
  children: string;
}

const AnimatedName: FC<Props> = ({ children }) => {
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
      className="flex flex-row mr-2 flex-wrap font-serif text-3xl md:text-title"
    >
      {letters.map((letter, index) => (
        <div key={index} className="overflow-hidden">
          <motion.div
            variants={child}
            className={classNames(
              "inline-block text-black transition-colors duration-300"
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
