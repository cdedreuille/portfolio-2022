"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import useMousePosition from "../hooks/useMousePosition";

export const Cursor = () => {
  const positionRef = useRef(null);
  const { x, y } = useMousePosition();

  useEffect(() => {
    console.log("x", x);
    console.log("y", y);
  }, [x, y]);

  if (x === null || y === null) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ x: x - 16, y: y - 16, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 0.6, 0.4, 1] }}
        className="w-8 h-8 fixed bg-[#ff4500] z-[999] rounded-full mix-blend-difference pointer-events-none"
        ref={positionRef}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ x: x - 32, y: y - 32, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 0.6, 0.4, 1] }}
        className="w-16 h-16 fixed z-[999] rounded-full mix-blend-difference pointer-events-none border border-[#ff4500]"
        ref={positionRef}
      />
    </>
  );
};
