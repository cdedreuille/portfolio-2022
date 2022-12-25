import { motion } from "framer-motion";
import Image from "next/image";
import { FC } from "react";
import { Button } from "./button";
import { linkLinkedIn, linkMail, linkTwitter, name } from "../content";

export const Charlie: FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 0.6, 0.4, 1] }}
      className="fixed h-screen top-0 bg-cream left-[50vw] w-1/2 z-[100]"
    >
      <div className="absolute w-[50vw] overflow-hidden top-0 left-0 bottom-0">
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
