"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import { linkInstagram, linkLinkedIn, linkMail, linkTwitter } from "content";
import { useInView, motion } from "framer-motion";
import classNames from "classnames";
import { useWindowSize } from "hooks/useWindowSize";

const container = {
  hidden: { opacity: 0 },
  visible: () => ({
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.1 },
  }),
};

const child = {
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
  },
};

const Footer: FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const letters = [
    "Le",
    "t'",
    "s",
    " ",
    "b",
    "e",
    " ",
    "f",
    "ri",
    "e",
    "n",
    "d",
    "s",
  ];
  const [isVisible, setIsVisible] = useState(false);
  const { width } = useWindowSize();

  useEffect(() => {
    if (isInView) setIsVisible(true);
  }, [isInView]);

  return (
    <footer className="p-6 md:p-12 py-20 md:py-48 relative md:z-50">
      <motion.div
        variants={container}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="flex items-center sm:justify-center font-serif uppercase text-titleXsPlus md:text-titleSm xl:text-titleMd mb-16 md:mb-24"
        style={{ fontFeatureSettings: '"dlig" 1,"kern" 1' }}
        ref={ref}
      >
        {width && width > 640 && (
          <div className="overflow-hidden flex items-center mr-8">
            <motion.div
              variants={child}
              className="inline-block transition-colors duration-300 text-3xl"
            >
              ✦
            </motion.div>
          </div>
        )}
        {letters.map((letter, index) => (
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
        {width && width > 640 && (
          <div className="overflow-hidden flex items-center ml-8">
            <motion.div
              variants={child}
              className="inline-block transition-colors duration-300 text-3xl"
            >
              ✦
            </motion.div>
          </div>
        )}
      </motion.div>
      <div
        className="flex flex-col items-start sm:flex-row justify-center font-serif text-titleXxs md:text-titleXs uppercase gap-6 md:gap-12"
        style={{ fontFeatureSettings: '"dlig" 1,"kern" 1' }}
      >
        <a href={linkMail} target="_blank" rel="noreferrer" className="group">
          <div className="border-b border-black group-hover:-translate-y-2 transition-all">
            Email
          </div>
        </a>
        <a
          href={linkTwitter}
          target="_blank"
          rel="noreferrer"
          className="group"
        >
          <div className="border-b border-black group-hover:-translate-y-2 transition-all">
            Twitter
          </div>
        </a>
        <a
          href={linkLinkedIn}
          target="_blank"
          rel="noreferrer"
          className="group"
        >
          <div className="border-b border-black group-hover:-translate-y-2 transition-all">
            LinkedIn
          </div>
        </a>
        <a
          href={linkInstagram}
          target="_blank"
          rel="noreferrer"
          className="group"
        >
          <div className="border-b border-black group-hover:-translate-y-2 transition-all">
            Instagram
          </div>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
