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
      className="fixed bottom-8 right-8 z-[888] w-[100px] h-[100px] bg-white flex items-center justify-center rounded-full border-2 border-gray2"
      style={{ opacity: opacity, y: posY }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="38"
        height="19"
        fill="none"
      >
        <path
          fill="#000"
          d="M.94 15.94a1.5 1.5 0 0 0 2.12 2.12L.94 15.94Zm34 2.12a1.5 1.5 0 0 0 2.12-2.12l-2.12 2.12ZM21.827 2.829l-1.06 1.061 1.06-1.06ZM3.061 18.061 17.232 3.889l-2.121-2.121L.939 15.939l2.122 2.122ZM20.768 3.889l14.171 14.172 2.122-2.122L22.889 1.768l-2.121 2.121Zm-3.536 0a2.5 2.5 0 0 1 3.536 0l2.121-2.121a5.5 5.5 0 0 0-7.778 0l2.121 2.121Z"
        />
      </svg>
    </motion.a>
  );
};
