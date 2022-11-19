import React, { FC } from "react";
import { motion } from "framer-motion";

interface Props {
  children: string;
}

const AnimatedDescription: FC<Props> = ({ children }) => {
  const words = children.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 2.8 * i,
      },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        // duration: 0.4,
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="inline-flex flex-row mr-2 flex-wrap -translate-y-[42px]"
    >
      <div className="w-[296px]" />
      {words.map((word, index) => {
        const letters = Array.from(word);
        return (
          <div key={index} className="overflow-hidden mr-2">
            {letters.map((letter, index) => (
              <motion.span
                variants={child}
                key={index}
                className="inline-block"
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </div>
        );
      })}
    </motion.div>
  );
};

export default AnimatedDescription;
