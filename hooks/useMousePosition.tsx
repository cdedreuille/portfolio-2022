import { useState, useEffect } from "react";
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState<{
    x: null | number;
    y: null | number;
  }>({
    x: null,
    y: null,
  });

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);
    const frame = window.requestAnimationFrame(() => {
      setMousePosition({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      });
    });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return mousePosition;
};

export default useMousePosition;
