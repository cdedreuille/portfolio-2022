"use client";

import { FC } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useWindowSize } from "../../hooks/useWindowSize";

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
        width="98"
        height="64"
        fill="none"
      >
        <path
          fill="#F52D11"
          stroke="#000"
          strokeWidth="4"
          d="M53.184 3.876 95.17 57.143c1.551 1.968.15 4.857-2.356 4.857H5.493c-2.558 0-3.943-2.996-2.285-4.944L48.543 3.789a3 3 0 0 1 4.64.087Z"
        />
      </svg>
    </motion.a>
  );
};
