import { FC } from "react";
import AnimatedName from "./animate-name";
import { linkLinkedIn, linkMail, linkTwitter, name, text } from "../content";
import { Button } from "./button";
import { IconInstagram } from "./icon-instagram";
import { IconLinkedin } from "./icon-linkedin";
import { Line } from "./line";

export const IntroMobile: FC = () => {
  return (
    <>
      <div className="mb-12 mx-6 pt-32">
        <div className="mb-6">
          <AnimatedName>Charles</AnimatedName>
          <AnimatedName>de Dreuille</AnimatedName>
        </div>
        <div className="col-span-4 mb-12">{text}</div>
        <div className="flex gap-4">
          <Button>About</Button>
          <Button href={linkMail}>Mail</Button>
          <Button href={linkLinkedIn} isCircle>
            <IconLinkedin />
          </Button>
          <Button href={linkTwitter} isCircle>
            <IconInstagram />
          </Button>
        </div>
      </div>
      <div className="mb-12">
        <Line />
      </div>
    </>
  );
};
