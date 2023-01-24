"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import useMousePosition from "../hooks/useMousePosition";
import { useWindowSize } from "../hooks/useWindowSize";

export const Cursor = () => {
  const positionRef = useRef(null);
  const { x, y } = useMousePosition();
  const { width } = useWindowSize();

  if (x === null || y === null) return null;
  if (width === undefined || width < 768) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ x: x - 16, y: y - 16, opacity: 1 }}
        transition={{ duration: 0, ease: [0.16, 0.6, 0.4, 1] }}
        className="w-8 h-8 fixed bg-[#fff] z-[9999] rounded-full mix-blend-difference pointer-events-none"
        ref={positionRef}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ x: x - 32, y: y - 32, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 0.6, 0.4, 1] }}
        className="w-16 h-16 fixed z-[9999] rounded-full mix-blend-difference pointer-events-none border border-[#fff]"
        ref={positionRef}
      />
    </>
  );
};
