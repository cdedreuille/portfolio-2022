"use client";

import { FC } from "react";
import AnimatedName from "./animate-name";
import { linkLinkedIn, linkMail, linkTwitter, name, text } from "../content";
import { Button } from "./button";
import { IconInstagram } from "./icon-instagram";
import { IconLinkedin } from "./icon-linkedin";
import { ZigZag } from "./zigzag";
import { Ellipse } from "./ellipse";

export const IntroDesktop: FC = () => {
  return (
    <>
      {/* Contact buttons */}
      <div className="fixed top-8 z-[9999] right-8 flex justify-end gap-4">
        <Button>About</Button>
        <Button href={linkMail}>Mail</Button>
        <Button href={linkLinkedIn} isCircle>
          <IconLinkedin />
        </Button>
        <Button href={linkTwitter} isCircle>
          <IconInstagram />
        </Button>
      </div>

      {/* Intro */}
      <div className="w-screen h-screen flex flex-col">
        <div className="relative flex-1 flex flex-col items-center justify-center bg-yellow-400">
          <div className="relative z-10 mb-12">
            <AnimatedName>{name}</AnimatedName>
          </div>
          <div className="relative z-10 max-w-lg text-center">
            <p>Designer & Creative Technologist</p>
            <p>Maker of Useful and Delightful Interfaces</p>
            <p>✶ Forever Curious ✶</p>
          </div>
          <Ellipse />
        </div>
        <div className="flex justify-center gap-8 items-center h-[160px] px-12">
          <div className="flex gap-4">
            <Button>All Projects</Button>
            <Button>Product Design</Button>
            <Button>Branding</Button>
            <Button>Visual Design</Button>
            <Button>Experimentations</Button>
          </div>
          <div className="flex gap-8 items-center">
            <ZigZag />
          </div>
        </div>
      </div>
    </>
  );
};
