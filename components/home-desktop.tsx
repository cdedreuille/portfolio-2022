import { FC, useEffect, useMemo, useState } from "react";
import AnimatedName from "./animate-name";
import { ProjectProps } from "../types";
import { ProjectLine } from "./project-line";
import { Project } from "./project2";
import { useRouter } from "next/router";
import classNames from "classnames";
import { Charlie } from "./home-charlie";
import { name } from "../content";
import { HomeVideo } from "./home-video.tsx";
import { Biography } from "./biography";
import { CloseBiography } from "./close-biography";
import { motion } from "framer-motion";

interface Props {
  data: ProjectProps[];
}

export const HomeDesktop: FC<Props> = ({ data }) => {
  const router = useRouter();
  const [projectHover, setProjectHover] = useState<null | string>(null);
  const [projectActive, setProjectActive] = useState<null | string>(null);
  const [aboutState, setAboutState] = useState<"closed" | "hover" | "active">(
    "closed"
  );
  const isActive = useMemo(() => !!projectActive, [projectActive]);

  useEffect(() => {
    if (router.asPath === "/") setProjectActive(null);
  }, [router.asPath]);

  return (
    <div className="bg-red h-screen fixed z-0 top-0 left-0 w-full hidden sm:flex cursor-none">
      {/* Left Panel */}
      <motion.div className="LeftSide fixed h-screen w-1/2 bg-red overflow-hidden">
        {/* Top Name */}
        <AnimatedName aboutState={aboutState}>{name}</AnimatedName>

        {/* Close Biography */}
        <CloseBiography aboutState={aboutState} setAboutState={setAboutState} />

        {/* Biography */}
        <Biography aboutState={aboutState} setAboutState={setAboutState} />

        {/* Overlays */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-red via-red to-transparent z-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-red to-transparent z-20 pointer-events-none" />

        {/* Project Lines */}
        <div className="absolute left-0 top-0 h-screen w-[50vw] overflow-scroll pt-[32vh] pb-24">
          <div className="flex justify-end">
            <div
              className="mb-[28vh] border-b border-black h-12 w-1/2 flex items-center"
              onMouseEnter={() => setAboutState("hover")}
              onMouseLeave={() => {
                if (aboutState !== "active") setAboutState("closed");
              }}
              onClick={() => setAboutState("active")}
            >
              About
            </div>
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
      </motion.div>

      {/* Right Panels */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: isActive ? "-50vw" : 0 }}
        transition={{ duration: 0.8, ease: [0.5, 0.15, 0.15, 1] }}
        className="RightSide fixed h-screen top-0 left-[50vw] bg-cyan-600"
      >
        {/* Video */}
        <HomeVideo aboutState={aboutState} />

        {/* Portrait */}
        <Charlie />

        {/* Projects */}
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
      </motion.div>
    </div>
  );
};
