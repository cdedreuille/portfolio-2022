import React, { FC } from "react";
import { motion } from "framer-motion";
import classNames from "classnames";

const AnimatedName: FC = () => {
  const lettersF = ["C", "h", "ar", "le", "s"];
  const lettersL = ["d", "e", " ", "D", "r", "eu", "i", "ll", "e"];

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.4 },
    }),
  };

  const child = {
    visible: {
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      y: 200,
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
      className="flex flex-row mr-2 flex-wrap font-serif text-titleSm xl:text-titleLg 2xl:text-titleXl 3xl:text-title2Xl md:text-title text-black uppercase"
      style={{ fontFeatureSettings: '"dlig" 1,"kern" 1' }}
    >
      {lettersF.map((letter, index) => (
        <div key={index} className="overflow-hidden">
          <motion.div
            variants={child}
            className={classNames(
              "inline-block transition-colors duration-300"
            )}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.div>
        </div>
      ))}
      {lettersL.map((letter, index) => (
        <div key={index} className="overflow-hidden mt-20">
          <motion.div
            variants={child}
            className={classNames(
              "inline-block transition-colors duration-300"
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
