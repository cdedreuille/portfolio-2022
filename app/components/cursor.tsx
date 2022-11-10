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
      className="w-10 h-10 fixed bg-[#ff4500] z-[999] rounded-full mix-blend-difference pointer-events-none"
      ref={positionRef}
      style={{ left: `${posX - 20}px`, top: `${posY - 20}px` }}
    />
  );
};
