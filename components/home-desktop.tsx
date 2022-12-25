import { FC, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import AnimatedName from "./animate-name";
import { ProjectProps } from "../types";
import { ProjectLine } from "./project-line";
import { Project } from "./project";
import { useRouter } from "next/router";
import classNames from "classnames";
import { Charlie } from "./charlie";
import { name } from "../content";

interface Props {
  data: ProjectProps[];
}

export const HomeDesktop: FC<Props> = ({ data }) => {
  const router = useRouter();
  const [projectHover, setProjectHover] = useState<null | string>(null);
  const [projectActive, setProjectActive] = useState<null | string>(null);
  const isActive = useMemo(() => !!projectActive, [projectActive]);

  useEffect(() => {
    if (router.asPath === "/") setProjectActive(null);
  }, [router.asPath]);

  return (
    <div className="bg-red h-screen fixed z-0 top-0 left-0 w-full hidden sm:flex">
      {/* Left Panel */}
      <div
        className={classNames(
          "fixed h-screen w-1/2 bg-red overflow-hidden transition-all duration-500",
          {
            "w-0": isActive,
          }
        )}
      >
        {/* Top Name */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1.4,
            ease: [0.16, 0.6, 0.4, 1],
            delay: 0.6,
          }}
          className="font-sans text-2xl fixed top-0 left-0 pt-8 pl-8 z-20"
        >
          <AnimatedName>{name}</AnimatedName>
        </motion.div>

        {/* Overlays */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-red via-red to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-red to-transparent z-10 pointer-events-none" />

        {/* Project Lines */}
        <div className="absolute left-0 top-0 h-screen w-[50vw] overflow-scroll pt-[40vh] pb-24">
          <div className="mb-32 flex flex-row items-center gap-4">
            <div className="w-4 h-px bg-black" />
            About
          </div>
          {data.map((project) => (
            <ProjectLine
              key={project._id}
              project={project}
              setProjectHover={setProjectHover}
              setProjectActive={setProjectActive}
              isActive={isActive}
            />
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <Charlie isActive={isActive} />
      {data.map((project, index) => (
        <Project
          key={project._id}
          project={project}
          isActive={isActive}
          projectActive={projectActive}
          isHover={projectHover === project._id}
          zIndex={data.length - index}
        />
      ))}
    </div>
  );
};
