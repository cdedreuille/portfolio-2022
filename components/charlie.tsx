import { motion } from "framer-motion";
import Image from "next/image";
import { FC } from "react";
import { ProjectProps } from "../types";
import classNames from "classnames";
import { Button } from "./button";
import { linkLinkedIn, linkMail, linkTwitter, name, text } from "../content";

interface Props {
  isActive: boolean;
  zIndex: number;
}

export const Charlie: FC<Props> = ({ isActive, zIndex }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 0.6, 0.4, 1] }}
      className={classNames(
        "fixed h-screen top-0 transition-all duration-1000 bg-cream",
        {
          "left-0": isActive,
          "left-[50vw]": !isActive,
          "w-full": isActive,
          "w-1/2": !isActive,
        },
        `z-[100]`
      )}
    >
      <div
        className={classNames(
          "absolute w-[50vw] overflow-hidden transition-all duration-1000",
          {
            "top-0": !isActive,
            "top-10": isActive,
            "left-0": !isActive,
            "left-10": isActive,
            "bottom-0": !isActive,
            "bottom-10": isActive,
            "rounded-lg": isActive,
          }
        )}
      >
        <div className="flex absolute gap-4 bottom-10 right-10">
          <Button href={linkMail}>Mail</Button>
          <Button href={linkLinkedIn}>LinkedIn</Button>
          <Button href={linkTwitter}>Twitter</Button>
        </div>
        <Image
          src="/charles-dedreuille.jpg"
          alt={name}
          fill
          className="object-cover"
          priority
          quality={100}
          sizes="(max-width: 500px) 100vw, (max-width: 500px) 100vw, 100vw"
        />
      </div>
    </motion.div>
  );
};
