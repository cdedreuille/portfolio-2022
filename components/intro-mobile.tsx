import { FC } from "react";
import AnimatedName from "./animate-name";
import { linkLinkedIn, linkMail, linkTwitter } from "../content";
import { Button } from "./button";
import { IconInstagram } from "./icon-instagram";
import { IconLinkedin } from "./icon-linkedin";
import { Line } from "./line";
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

export const IntroMobile: FC = () => {
  return (
    <>
      <div className="mb-12 mx-6 pt-16">
        <div className="mb-6">
          <AnimatedName />
        </div>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 flex flex-col font-serif text-lg mb-16 gap-2"
        >
          <div className="overflow-hidden max-w-sm">
            <motion.div variants={item}>
              Designer & Creative Technologist. Maker of Useful and Delightful
              Interfaces. Forever Curious.
            </motion.div>
          </div>
        </motion.div>
        <div className="flex gap-4">
          <Button>About</Button>
          <Button href={linkMail}>Mail</Button>
          <Button href={linkLinkedIn} isCircle>
            <IconLinkedin />
          </Button>
          <Button href={linkTwitter} isCircle>
            <IconInstagram />
          </Button>
        </div>
      </div>
      <div className="mb-12">
        <Line />
      </div>
    </>
  );
};
