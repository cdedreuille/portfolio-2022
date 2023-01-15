import { FC } from "react";
import AnimatedName from "./animate-name";
import { linkLinkedIn, linkMail, linkTwitter } from "../content";
import { Button } from "./button";
import { IconInstagram } from "./icon-instagram";
import { IconLinkedin } from "./icon-linkedin";
import { ZigZag } from "./zigzag";
import { Ellipse } from "./ellipse";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: (i = 1) => ({
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
    <>
      {/* Contact buttons */}
      <div className="absolute top-8 z-[9999] right-8 flex justify-end gap-4">
        <Button>About</Button>
        <Button href={linkMail}>Mail</Button>
        <Button href={linkLinkedIn} isCircle>
          <IconLinkedin />
        </Button>
        <Button href={linkTwitter} isCircle>
          <IconInstagram />
        </Button>
      </div>

      {/* Intro */}
      <div className="w-screen h-screen flex flex-col">
        <div className="relative flex-1 flex flex-col items-center justify-center">
          <div className="relative z-10 mt-20 mb-12">
            <AnimatedName />
          </div>
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
          <Ellipse />
        </div>
        <div className="flex justify-center gap-8 items-center h-[160px] px-12">
          <div className="flex gap-4">
            <Button>Product Design</Button>
            <Button>Branding</Button>
            <Button>Visual Design</Button>
            <Button>Experimentations</Button>
          </div>
          <div className="flex gap-8 items-center">
            <ZigZag />
          </div>
        </div>
      </div>
    </>
  );
};
