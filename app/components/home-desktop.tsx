"use client";

import Image from "next/image";
import { FC, useEffect, useState } from "react";
import profilePic from "../../public/charles-dedreuille.jpg";
import { linkLinkedIn, linkMail, linkTwitter, name, text } from "../content";
import LiveDrawing from "./live-drawing";
import useMousePosition from "../hooks/useMousePosition";

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
  const [fontWeight, setFontWeight] = useState("font-bold");
  const { x, y } = useMousePosition();

  useEffect(() => {
    const posX = x || 0;
    const posY = y || 0;
    const pX = (posX * 100) / window.innerWidth;
    const pY = (posY * 100) / window.innerHeight;
    if (pX >= 0 && pX < 14) {
      if (pY >= 0 && pY < 14) setFontWeight("font-thin");
      if (pY >= 14 && pY < 28) setFontWeight("font-extralight");
      if (pY >= 28 && pY < 42) setFontWeight("font-light");
      if (pY >= 42 && pY < 56) setFontWeight("font-normal");
      if (pY >= 56 && pY < 60) setFontWeight("font-medium");
      if (pY >= 60 && pY < 74) setFontWeight("font-semibold");
      if (pY >= 74 && pY <= 100) setFontWeight("font-bold");
    }
    if (pX >= 14 && pX < 28) {
      if (pY >= 0 && pY < 14) setFontWeight("font-extralight");
      if (pY >= 14 && pY < 28) setFontWeight("font-extralight");
      if (pY >= 28 && pY < 42) setFontWeight("font-light");
      if (pY >= 42 && pY < 56) setFontWeight("font-normal");
      if (pY >= 56 && pY < 60) setFontWeight("font-medium");
      if (pY >= 60 && pY < 74) setFontWeight("font-semibold");
      if (pY >= 74 && pY <= 100) setFontWeight("font-bold");
    }
    if (pX >= 28 && pX < 42) {
      if (pY >= 0 && pY < 14) setFontWeight("font-light");
      if (pY >= 14 && pY < 28) setFontWeight("font-light");
      if (pY >= 28 && pY < 42) setFontWeight("font-light");
      if (pY >= 42 && pY < 56) setFontWeight("font-normal");
      if (pY >= 56 && pY < 60) setFontWeight("font-medium");
      if (pY >= 60 && pY < 74) setFontWeight("font-semibold");
      if (pY >= 74 && pY <= 100) setFontWeight("font-bold");
    }
    if (pX >= 42 && pX < 56) {
      if (pY >= 0 && pY < 14) setFontWeight("font-normal");
      if (pY >= 14 && pY < 28) setFontWeight("font-normal");
      if (pY >= 28 && pY < 42) setFontWeight("font-normal");
      if (pY >= 42 && pY < 56) setFontWeight("font-normal");
      if (pY >= 56 && pY < 60) setFontWeight("font-medium");
      if (pY >= 60 && pY < 74) setFontWeight("font-semibold");
      if (pY >= 74 && pY <= 100) setFontWeight("font-bold");
    }
    if (pX >= 56 && pX < 60) {
      if (pY >= 0 && pY < 14) setFontWeight("font-medium");
      if (pY >= 14 && pY < 28) setFontWeight("font-medium");
      if (pY >= 28 && pY < 42) setFontWeight("font-medium");
      if (pY >= 42 && pY < 56) setFontWeight("font-medium");
      if (pY >= 56 && pY < 60) setFontWeight("font-medium");
      if (pY >= 60 && pY < 74) setFontWeight("font-semibold");
      if (pY >= 74 && pY <= 100) setFontWeight("font-bold");
    }
    if (pX >= 60 && pX < 74) {
      if (pY >= 0 && pY < 14) setFontWeight("font-semibold");
      if (pY >= 14 && pY < 28) setFontWeight("font-semibold");
      if (pY >= 28 && pY < 42) setFontWeight("font-semibold");
      if (pY >= 42 && pY < 56) setFontWeight("font-semibold");
      if (pY >= 56 && pY < 60) setFontWeight("font-semibold");
      if (pY >= 60 && pY < 74) setFontWeight("font-semibold");
      if (pY >= 74 && pY <= 100) setFontWeight("font-bold");
    }
    if (pX >= 74 && pX <= 100) {
      if (pY >= 0 && pY < 14) setFontWeight("font-bold");
      if (pY >= 14 && pY < 28) setFontWeight("font-bold");
      if (pY >= 28 && pY < 42) setFontWeight("font-bold");
      if (pY >= 42 && pY < 56) setFontWeight("font-bold");
      if (pY >= 56 && pY < 60) setFontWeight("font-bold");
      if (pY >= 60 && pY < 74) setFontWeight("font-bold");
      if (pY >= 74 && pY <= 100) setFontWeight("font-bold");
    }
  }, [x, y]);

  return (
    <div className="bg-red h-screen fixed z-0 top-0 left-0 w-full hidden sm:flex">
      <div className="flex-1 p-12 flex flex-col justify-between">
        <div className={`max-w-2xl text-2xl font-serif ${fontWeight}`}>
          <span className="text-white">{name}</span> {text}
        </div>
        <div>
          <div className="text-2xl mb-8">Want to work together?</div>
          <div className="flex gap-4">
            <Button href={linkMail}>Mail</Button>
            <Button href={linkLinkedIn}>LinkedIn</Button>
            <Button href={linkTwitter}>Twitter</Button>
          </div>
        </div>
      </div>
      <div className="w-[50%] bg-cream relative overflow-hidden">
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
      </div>
    </div>
  );
};
