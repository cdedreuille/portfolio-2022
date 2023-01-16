import { useIsomorphicLayoutEffect } from "framer-motion";
import Image from "next/image";
import { FC, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import SplitType from "split-type";
import { useWindowSize } from "hooks/useWindowSize";

gsap.registerPlugin(ScrollTrigger);

export const Biography: FC = () => {
  const textContainer = useRef<HTMLDivElement | null>(null);
  const text1 = useRef(null);
  const container = useRef(null);
  const { height } = useWindowSize();
  const containerHeight = textContainer.current?.clientHeight;
  const bottomOffset = height ? height / 6 : 0;
  const transY = useMemo(() => {
    if (containerHeight && height) {
      if (containerHeight > height) {
        return -(height / 2 + (containerHeight - height) + bottomOffset);
      } else {
        return -(height / 2 - (height - containerHeight - bottomOffset));
      }
    }
    return null;
  }, [bottomOffset, containerHeight, height]);

  useIsomorphicLayoutEffect(() => {
    if (text1.current !== null && transY && containerHeight) {
      const text1 = new SplitType("#text1");
      const text2 = new SplitType("#text2");
      const text3 = new SplitType("#text3");

      const ctx = gsap.context(() => {
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".timeline-top",
            pin: true,
            start: "top top",
            scrub: 0.2,
            // markers: true,
            end: "+=2200",
          },
        });
        tl.fromTo(
          text1.lines,
          { opacity: 0, rotate: 3 },
          { opacity: 1, rotate: 0, stagger: 0.4, duration: 1 },
          "<"
        );
        tl.fromTo(
          text2.lines,
          { opacity: 0, rotate: 3 },
          { opacity: 1, rotate: 0, stagger: 0.4, duration: 1 }
        );
        tl.fromTo(
          text3.lines,
          { opacity: 0, rotate: 3 },
          { opacity: 1, rotate: 0, stagger: 0.4, duration: 1 }
        );

        let tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: ".timeline-top",
            start: "top top",
            scrub: 0.2,
            // markers: true,
            end: "+=2200",
          },
        });
        tl2.to("#text-container", { y: transY });
      }, container);
      return () => ctx.revert();
    }
  }, [transY]);

  return (
    <div ref={container}>
      <div className="timeline-top h-screen bg-black relative">
        <div
          id="text-container"
          className="max-w-lg absolute top-1/2 z-10 left-[10vw]"
          ref={textContainer}
        >
          <div id="text1" className="text-white text-lg mb-12" ref={text1}>
            Tobias’ journey is a little different than most. He started his
            career by dropping out of high school at 15 with grand plans of
            becoming a software engineer. After realizing he, quite frankly,
            sucked at it, Tobias began teaching himself design at the age of 16.
            Fast forward a few years and he is now a designer, founder, speaker,
            mentor and maker.
          </div>
          <div id="text2" className="text-white text-lg mb-12" ref={text1}>
            Tobias’ journey is a little different than most. He started his
            career by dropping out of high school at 15 with grand plans of
            becoming a software engineer. After realizing he, quite frankly,
            sucked at it, Tobias began teaching himself design at the age of 16.
            Fast forward a few years and he is now a designer, founder, speaker,
            mentor and maker.
          </div>
          <div id="text3" className="text-white text-lg" ref={text1}>
            Tobias’ journey is a little different than most. He started his
            career by dropping out of high school at 15 with grand plans of
            becoming a software engineer. After realizing he, quite frankly,
            sucked at it, Tobias began teaching himself design at the age of 16.
            Fast forward a few years and he is now a designer, founder, speaker,
            mentor and maker.
          </div>
        </div>
        <Image
          src="/biography.jpg"
          fill
          alt="Charles de Dreuille"
          style={{ objectFit: "cover" }}
        />
      </div>
    </div>
  );
};
