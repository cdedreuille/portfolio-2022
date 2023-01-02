import Link from "next/link";
import { FC } from "react";
import { ProjectProps } from "../types";
import AnimatedName from "./animate-name";
import { linkLinkedIn, linkMail, linkTwitter, name } from "../content";
import { Button } from "./button";

interface Props {}

export const IntroDesktop: FC<Props> = () => {
  return (
    <div className="h-screen p-12 flex flex-col">
      <div className="flex-1">
        <div className="flex justify-end gap-4">
          <Button href={linkMail}>Mail</Button>
          <Button href={linkLinkedIn}>LinkedIn</Button>
          <Button href={linkTwitter}>Twitter</Button>
        </div>
        {/* Top Name */}
        <AnimatedName>{name}</AnimatedName>
      </div>
      <div className="w-full h-[2px]" />
      <div className="py-12">
        <div className="flex gap-4">
          <Button href={linkMail}>Mail</Button>
          <Button href={linkLinkedIn}>LinkedIn</Button>
          <Button href={linkTwitter}>Twitter</Button>
        </div>
      </div>
    </div>
  );
};
