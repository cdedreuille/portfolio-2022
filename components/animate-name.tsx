"use client";

import React, { FC } from "react";
import { motion } from "framer-motion";

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
      className="inline-flex flex-row mr-2 flex-wrap"
    >
      {letters.map((letter, index) => (
        <div key={index} className="overflow-hidden">
          <motion.div variants={child} className="inline-block text-black">
            {letter === " " ? "\u00A0" : letter}
          </motion.div>
        </div>
      ))}
    </motion.div>
  );
};

export default AnimatedName;
