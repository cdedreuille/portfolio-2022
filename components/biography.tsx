import { useIsomorphicLayoutEffect } from "framer-motion";
import Image from "next/image";
import { FC, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Biography: FC = () => {
  const container = useRef(null);
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ".timeline-top",
        pin: true,
        start: "top top",
        end: "+=300",
        markers: true,
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={container}>
      <div className="timeline-top flex justify-end h-screen bg-emerald-800 relative">
        <div className="w-[60%] relative h-full">
          <Image
            src="/charles-dedreuille.jpg"
            fill
            alt="Charles de Dreuille"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
};
