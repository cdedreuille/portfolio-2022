import { FC } from "react";
import AnimatedName from "./animate-name";
import { linkInstagram, linkLinkedIn, linkMail, linkTwitter } from "../content";
import { Button } from "./button";
import { IconInstagram } from "./icon-instagram";
import { IconLinkedin } from "./icon-linkedin";
import { ZigZag } from "./zigzag";
import { Ellipse } from "./ellipse";
import { motion } from "framer-motion";
import { IconTwitter } from "./icon-twitter";

const container = {
  hidden: { opacity: 0 },
  show: () => ({
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 1.2 },
  }),
};

const item = {
  hidden: {
    y: 180,
  },
  show: {
    y: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
    },
  },
};

export const IntroDesktop: FC = () => {
  return (
    <div className="w-screen h-screen flex flex-col relative">
      {/* Buttons */}
      <div className="absolute bottom-14 left-14 flex justify-end gap-4">
        <Button href={linkMail}>Email</Button>
        <Button href={linkTwitter} isCircle>
          <IconTwitter />
        </Button>
        <Button href={linkLinkedIn} isCircle>
          <IconLinkedin />
        </Button>
        <Button href={linkInstagram} isCircle>
          <IconInstagram />
        </Button>
      </div>

      {/* ZigZag */}
      <div className="absolute z-10 right-12 bottom-12 flex gap-8 items-center">
        <div className="font-serif text-lg xl:text-xl">Work</div>
        <ZigZag />
      </div>

      {/* Content */}
      <div className="relative flex-1 flex flex-col items-center justify-center">
        {/* Name */}
        <AnimatedName />

        {/* Intro */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 flex flex-col items-center font-serif text-lg xl:text-xl"
        >
          <div className="overflow-hidden">
            <motion.div variants={item}>
              Designer & Creative Technologist
            </motion.div>
          </div>
          <div className="overflow-hidden">
            <motion.div variants={item}>
              Maker of Useful and Delightful Interfaces
            </motion.div>
          </div>
          <div className="overflow-hidden">
            <motion.div variants={item} className="flex gap-4">
              <div>✶</div> Forever Curious <div>✶</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Ellipse */}
        <Ellipse />
      </div>
    </div>
  );
};
