"use client";

import { useRef } from "react";
import useMousePosition from "../hooks/useMousePosition";

export const Cursor = () => {
  const positionRef = useRef(null);
  const { x, y } = useMousePosition();
  const posX = x || 0;
  const posY = y || 0;

  return (
    <div
      className="w-20 h-20 fixed bg-[#ff4500] z-[999] rounded-full mix-blend-difference"
      ref={positionRef}
      style={{ left: `${posX - 40}px`, top: `${posY - 40}px` }}
    />
  );
};
