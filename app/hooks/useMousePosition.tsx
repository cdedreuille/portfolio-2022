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
    const updateMousePosition = (ev: { clientX: any; clientY: any }) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  useEffect(() => {
    if (window.innerWidth && window.innerHeight)
      setMousePosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  }, []);

  return mousePosition;
};

export default useMousePosition;
