"use client";

import Image from "next/image";
import { FC } from "react";
import profilePic from "../../public/charles-dedreuille.jpg";
import { linkLinkedIn, linkMail, linkTwitter, name, text } from "../content";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimatedName from "./animate-name";
import AnimatedDescription from "./animated-description";
import { ProjectProps } from "../../types";
import { Button } from "./button";
import { ProjectLine } from "./project-line";
import { Project } from "./project";

interface Props {
  data: ProjectProps[];
}

export const HomeDesktop: FC<Props> = ({ data }) => {
  const { scrollY } = useScroll();
  const opacityText = useTransform(scrollY, [0, 800], [1, 0]);
  const opacityImage = useTransform(scrollY, [0, 600], [0, 1]);

  return (
    <div className="bg-red h-screen fixed z-0 top-0 left-0 w-full hidden sm:flex">
      <motion.div
        className="flex-1 p-12 h-screen overflow-scroll"
        style={{ opacity: opacityText }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 0.6, 0.4, 1], delay: 0.6 }}
          className="font-sans text-2xl"
        >
          <AnimatedName>{name}</AnimatedName>
        </motion.div>
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 0.6, 0.4, 1], delay: 1 }}
        >
          <motion.div className="text-2xl mb-8">
            Want to work together?
          </motion.div>
          <div className="flex flex-row items-center justify-between gap-8">
            <div className="flex gap-4">
              <Button href={linkMail}>Mail</Button>
              <Button href={linkLinkedIn}>LinkedIn</Button>
              <Button href={linkTwitter}>Twitter</Button>
            </div>
            <div className="flex flex-row items-center gap-4">
              Work
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="10"
                fill="none"
              >
                <path fill="#000" d="M7 10 .072.25h13.856L7 10Z" />
              </svg>
            </div>
          </div>
        </motion.div> */}
        <div className="pt-[50vh] pb-24">
          <div className="flex-1">
            {data.map((project) => (
              <ProjectLine key={project._id} project={project} />
            ))}
          </div>
        </div>
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
