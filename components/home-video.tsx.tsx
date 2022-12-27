import { motion } from "framer-motion";
import { FC } from "react";
import classNames from "classnames";
import { Button } from "./button";
import { linkLinkedIn, linkMail, linkTwitter } from "../content";

interface Props {
  aboutState: "closed" | "hover" | "active";
}

export const HomeVideo: FC<Props> = ({ aboutState }) => {
  return (
    <motion.div
      className={classNames("Video absolute h-full w-full bg-cream", {
        "z-[90]": aboutState === "hover" || aboutState === "active",
        "z-[110]": aboutState === "closed",
      })}
    >
      <div className="absolute w-[50vw] overflow-hidden top-0 left-0 bottom-0">
        <div className="flex absolute gap-4 bottom-10 right-10">
          <Button href={linkMail}>Mail</Button>
          <Button href={linkLinkedIn}>LinkedIn</Button>
          <Button href={linkTwitter}>Twitter</Button>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-96 bg-gradient-to-t from-black to-transparent pointer-events-none" />
        <video
          src="/rocks.mp4"
          autoPlay
          muted
          loop
          className="object-cover h-full w-full"
        />
      </div>
    </motion.div>
  );
};
