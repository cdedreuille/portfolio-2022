import { FC } from "react";
import AnimatedName from "./animate-name";
import { linkLinkedIn, linkMail, linkTwitter, name, text } from "../content";
import { Button } from "./button";
import { Line } from "./line";

interface Props {}

export const IntroDesktop: FC<Props> = () => {
  return (
    <div className="h-screen p-12 flex flex-col">
      <div className="flex-1 flex flex-col justify-between pb-40">
        <div className="flex justify-end gap-4">
          <Button href={linkMail}>Mail</Button>
          <Button href={linkLinkedIn}>LinkedIn</Button>
          <Button href={linkTwitter}>Twitter</Button>
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
      <div className="pb-12 pt-24">
        <div className="flex gap-4">
          <Button href={linkMail}>Mail</Button>
          <Button href={linkLinkedIn}>LinkedIn</Button>
          <Button href={linkTwitter}>Twitter</Button>
        </div>
      </div>
    </div>
  );
};
