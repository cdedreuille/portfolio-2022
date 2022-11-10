"use client";

import { FC } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useWindowSize } from "../hooks/useWindowSize";

export const ArrowUp: FC = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.025, 0.03], [0, 1]);
  const posY = useTransform(scrollYProgress, [0.025, 0.03], [40, 0]);
  const { width } = useWindowSize();

  if (width === undefined || width < 768) return null;

  return (
    <motion.a
      href="#top"
      className="fixed bottom-8 right-8 z-[888]"
      style={{ opacity: opacity, y: posY }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="126"
        height="83"
        fill="none"
      >
        <path
          fill="#F52D11"
          stroke="#000"
          strokeWidth="9"
          d="m67.612 5.907 52.596 67.245c1.54 1.97.137 4.848-2.363 4.848H8.46c-2.553 0-3.939-2.985-2.292-4.936L62.957 5.82a3 3 0 0 1 4.655.087Z"
        />
      </svg>
    </motion.a>
  );
};
