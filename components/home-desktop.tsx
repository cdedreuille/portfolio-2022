import Image from "next/image";
import { FC, useState } from "react";
import { linkLinkedIn, linkMail, linkTwitter, name, text } from "../content";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimatedName from "./animate-name";
import AnimatedDescription from "./animated-description";
import { ProjectProps } from "../types";
import { Button } from "./button";
import { ProjectLine } from "./project-line";
import { Project } from "./project";
import { useRouter } from "next/router";
import classNames from "classnames";

interface Props {
  data: ProjectProps[];
}

export const HomeDesktop: FC<Props> = ({ data }) => {
  const router = useRouter();
  const { scrollY } = useScroll();
  const opacityText = useTransform(scrollY, [0, 800], [1, 0]);
  const opacityImage = useTransform(scrollY, [0, 600], [0, 1]);

  const isActive = !!router.query.project;

  return (
    <div className="bg-red h-screen fixed z-0 top-0 left-0 w-full hidden sm:flex">
      {/* Left Panel */}
      <div
        className={classNames(
          "fixed h-screen w-1/2 bg-red overflow-hidden transition-all duration-1000",
          {
            "w-0": isActive,
          }
        )}
      >
        <div className="absolute left-0 top-0 p-12 h-screen w-[50vw] overflow-scroll">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1.4,
              ease: [0.16, 0.6, 0.4, 1],
              delay: 0.6,
            }}
            className="font-sans text-2xl"
          >
            <AnimatedName>{name}</AnimatedName>
          </motion.div>
          <div className="pt-[50vh] pb-4">
            <div className="flex-1">
              {data.map((project) => (
                <ProjectLine key={project._id} project={project} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
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
          }
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
    </div>
  );
};
