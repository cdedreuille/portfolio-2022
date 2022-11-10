"use client";

import Image from "next/image";
import { FC, useEffect, useState } from "react";
import profilePic from "../../public/charles-dedreuille.jpg";
import { linkLinkedIn, linkMail, linkTwitter, name, text } from "../content";
import LiveDrawing from "./live-drawing";
import useMousePosition from "../hooks/useMousePosition";
import { motion, useScroll, useTransform } from "framer-motion";

const Button: FC<{ children: string; href: string }> = ({ children, href }) => {
  return (
    <div className="group relative">
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 bg-red border border-black px-8 py-2 rounded-full text-base block cursor-pointer transition-transform"
      >
        {children}
      </a>
      <div className="bg-black w-full h-full absolute top-0 z-0 rounded-full" />
    </div>
  );
};

export const HomeDesktop = () => {
  const [fontWeight, setFontWeight] = useState(200);
  const [fontSlant, setFontSlant] = useState(0);
  const { x, y } = useMousePosition();
  const { scrollY } = useScroll();
  const positionText = useTransform(scrollY, [0, 800], [0, -64]);
  const opacityText = useTransform(scrollY, [0, 800], [1, 0]);
  const opacityImage = useTransform(scrollY, [0, 600], [0, 1]);

  const mapValue = (
    value: number,
    fromRange: { min: number; max: number },
    toRange: { min: number; max: number }
  ) => {
    const { min: fromMin, max: fromMax } = fromRange;
    const { min: toMin, max: toMax } = toRange;
    // Determine how wide the ranges are
    const fromSize = fromMax - fromMin;
    const toSize = toMax - toMin;
    // Get the percentage of the original range `value` represents, ignoring the minimum value
    const fromPercent = (value - fromMin) / fromSize;
    // Get the corresponding percentage of the new range, plus its minimum value
    const result = fromPercent * toSize + toMin;
    return Math.round(result);
  };

  useEffect(() => {
    const posX = x || 0;
    const posY = y || 0;
    const newFontWeight = mapValue(
      posX,
      { min: 0, max: window.innerWidth },
      { min: 300, max: 600 }
    );
    const newFontSlant = mapValue(
      posY,
      { min: 0, max: window.innerHeight },
      { min: 0, max: -10 }
    );
    setFontWeight(newFontWeight);
    setFontSlant(newFontSlant);
  }, [x, y]);

  return (
    <div className="bg-red h-screen fixed z-0 top-0 left-0 w-full hidden sm:flex">
      <motion.div
        className="flex-1 p-12 flex flex-col justify-between"
        style={{ opacity: opacityText }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 0.6, 0.4, 1], delay: 0.6 }}
          className="max-w-xl text-lg font-sans"
          style={{
            fontWeight: fontWeight,
            fontVariationSettings: `'slnt' ${fontSlant}`,
            y: positionText,
          }}
        >
          <span className="text-white">{name}</span> {text}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 0.6, 0.4, 1], delay: 1 }}
        >
          <div className="text-2xl mb-8">Want to work together?</div>
          <div className="flex gap-4">
            <Button href={linkMail}>Mail</Button>
            <Button href={linkLinkedIn}>LinkedIn</Button>
            <Button href={linkTwitter}>Twitter</Button>
          </div>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "50%", opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 0.6, 0.4, 1] }}
        className="bg-cream relative overflow-hidden"
      >
        <motion.div
          className="absolute bg-red w-full h-full z-50 opacity-0 pointer-events-none"
          style={{ opacity: opacityImage }}
        />
        <LiveDrawing />
        <Image
          src={profilePic}
          alt={name}
          fill
          className="object-cover"
          priority
          quality={100}
          sizes="(max-width: 500px) 100vw, (max-width: 500px) 100vw, 100vw"
        />
      </motion.div>
    </div>
  );
};
