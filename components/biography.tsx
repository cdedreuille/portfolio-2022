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
  const { width, height } = useWindowSize();
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

  if (width && width < 768)
    return (
      <div>
        <div className="relative w-full h-80">
          <Image
            src="/charles-dedreuille.jpg"
            fill
            alt="Charles de Dreuille"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="px-6 pt-12">
          <div id="text1" className="text-black text-sm mb-8" ref={text1}>
            I’ve started coding since I’m 14 years old, building computers and
            creating little games for my friends. It’s only when a couple years
            later that I started to be introduced to design and typography.
            Since then, I’ve always merged design and engineering to create
            digital experiences.
          </div>
          <div id="text2" className="text-black text-sm mb-8" ref={text1}>
            First part of my career was focus on creating delightful digital
            experiences to promote brands and their products on marketing
            websites or e-commerce. This was a way to use both design and
            engineering to tell the best stories. I had the chance to
            collaborate with brands like Christian Louboutin, Deliveroo,
            Coca-Cola with the design studio I co-created in London, La Moulade.
          </div>
          <div id="text3" className="text-black text-sm" ref={text1}>
            Since 2016, I explored working directly with incredibly talented
            product teams, solving people’s problems by creating interfaces that
            could improve their daily lives. I worked with teams at Deliveroo,
            Meta, Soho House and many other start ups always by bringing design
            and engineering together.
          </div>
        </div>
      </div>
    );

  return (
    <div ref={container}>
      <div className="timeline-top h-screen bg-black relative">
        <div
          id="text-container"
          className="max-w-lg absolute top-1/2 z-10 left-[10vw]"
          ref={textContainer}
        >
          <div id="text1" className="text-white text-lg mb-12" ref={text1}>
            I’ve started coding since I’m 14 years old, building computers and
            creating little games for my friends. It’s only when a couple years
            later that I started to be introduced to design and typography.
            Since then, I’ve always merged design and engineering to create
            digital experiences.
          </div>
          <div id="text2" className="text-white text-lg mb-12" ref={text1}>
            First part of my career was focus on creating delightful digital
            experiences to promote brands and their products on marketing
            websites or e-commerce. This was a way to use both design and
            engineering to tell the best stories. I had the chance to
            collaborate with brands like Christian Louboutin, Deliveroo,
            Coca-Cola with the design studio I co-created in London, La Moulade.
          </div>
          <div id="text3" className="text-white text-lg" ref={text1}>
            Since 2016, I explored working directly with incredibly talented
            product teams, solving people’s problems by creating interfaces that
            could improve their daily lives. I worked with teams at Deliveroo,
            Meta, Soho House and many other start ups always by bringing design
            and engineering together.
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
