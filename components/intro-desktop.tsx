import { FC } from "react";
import AnimatedName from "./animate-name";
import { linkLinkedIn, linkMail, linkTwitter, name, text } from "../content";
import { Button } from "./button";
import { Line } from "./line";
import { IconInstagram } from "./icon-instagram";
import { IconLinkedin } from "./icon-linkedin";
import { ZigZag } from "./zigzag";

export const IntroDesktop: FC = () => {
  return (
    <div className="h-screen p-12 flex flex-col">
      <div className="flex-1 flex flex-col justify-between pb-40">
        <div className="flex justify-end gap-4">
          <Button>About</Button>
          <Button href={linkMail}>Mail</Button>
          <Button href={linkLinkedIn} isCircle>
            <IconLinkedin />
          </Button>
          <Button href={linkTwitter} isCircle>
            <IconInstagram />
          </Button>
        </div>
        <div className="grid grid-cols-12">
          <div className="col-span-8">
            <AnimatedName>{name}</AnimatedName>
          </div>
          <div className="col-span-4">{text}</div>
        </div>
      </div>
      <div className="w-full h-[2px]" />
      <Line />
      <div className="flex justify-between items-center pb-12 pt-24">
        <div className="flex gap-8 items-center">
          <div className="font-serif text-2xl">Work</div>
          <ZigZag />
        </div>
        <div className="flex gap-4">
          <Button>All Projects</Button>
          <Button>Product Design</Button>
          <Button>Branding</Button>
          <Button>Visual Design</Button>
          <Button>Experimentations</Button>
        </div>
      </div>
    </div>
  );
};
