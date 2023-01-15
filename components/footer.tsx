import React, { FC, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { linkInstagram, linkLinkedIn, linkMail, linkTwitter } from "content";
import { useInView, motion } from "framer-motion";
import classNames from "classnames";

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

const Footer: FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const letters = ["g", "et", " ", "i", "n", " ", "to", "u", "c", "h"];
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isInView) setIsVisible(true);
  }, [isInView]);

  return (
    <footer className="p-4 md:p-12 pb-20 md:pb-48 relative z-50">
      <div className="w-full h-[2px] overflow-hidden relative mb-16 md:mb-48">
        <Image src="/holo.png" alt="holo" fill className="object-cover" />
      </div>
      <motion.div
        variants={container}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="flex font-serif uppercase text-titleXsPlus md:text-titleSm xl:text-titleLg 2xl:text-titleXl 3xl:text-title2Xl mb-16 md:mb-24 xl:ml-[10vw] 2xl:ml-[14vw] 3xl:ml-[20vw]"
        style={{ fontFeatureSettings: '"dlig" 1,"kern" 1' }}
        ref={ref}
      >
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
      </motion.div>
      <div
        className="flex flex-col items-start md:flex-row justify-end font-serif text-titleXxs md:text-titleXs uppercase gap-6 md:gap-12 xl:mr-[10vw] 2xl:mr-[14vw] 3xl:mr-[20vw]"
        style={{ fontFeatureSettings: '"dlig" 1,"kern" 1' }}
      >
        <a href={linkMail} target="_blank" rel="noreferrer" className="group">
          <div className="border-b border-black group-hover:-translate-y-2 transition-all">
            Email
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
            Twitter
          </div>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
