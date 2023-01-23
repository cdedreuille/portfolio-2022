import React, { FC } from "react";
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
}

const variants = {
  visible: {},
  hidden: {},
};

const enter = {
  visible: { width: 0 },
  hidden: { width: "100vw" },
};

const exit = {
  visible: { width: 0 },
  hidden: { width: "100vw" },
};

const flow = {
  visible: { x: 0 },
  hidden: { x: -100 },
};

const duration = 0.6;

const Layout: FC<Props> = ({ children }) => (
  <motion.div
    variants={variants}
    initial="hidden"
    animate="visible"
    exit="hidden"
  >
    <motion.div
      variants={enter}
      initial="hidden"
      animate="visible"
      transition={{ duration }}
      className="fixed z-[999] bg-black h-screen top-0 left-0 bottom-0"
    />
    <motion.div
      variants={exit}
      initial="visible"
      animate="visible"
      exit="hidden"
      transition={{ duration }}
      className="fixed z-[999] bg-black h-screen top-0 right-0 bottom-0"
    />
    <motion.div
      variants={flow}
      initial="visible"
      animate="visible"
      exit="hidden"
      transition={{ duration }}
    >
      {children}
    </motion.div>
  </motion.div>
);

export default Layout;
