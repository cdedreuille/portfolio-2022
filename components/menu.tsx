import {
  useScroll,
  useTransform,
  motion,
  AnimatePresence,
} from "framer-motion";
import { projectQuery } from "lib/queries";
import { getClient } from "lib/sanity.server";
import { groq } from "next-sanity";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { ProjectProps } from "types";
import { useGlobal } from "./global-provider";
import { Item } from "./list-item-menu";

export const Menu: FC = () => {
  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const position = useTransform(scrollYProgress, [0, 0.06, 1], [64, 48, 48]);
  const router = useRouter();
  const { setActiveProject } = useGlobal();

  useEffect(() => {
    (async () => {
      const result = await getClient().fetch(
        groq`*[_type == "projectList" && _id == "projectList"][0]{
          ...,
          projects[]->${projectQuery}
        }.projects`
      );
      setProjects(result);
    })();
  }, []);

  const backHome = () => {
    setActiveProject(null);
    router.push("/");
  };

  return (
    <>
      <motion.div
        style={{ left: position, top: position }}
        className="fixed group h-12 z-50"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <div className="relative z-10 font-mono uppercase text-black px-6 h-12 flex items-center rounded-full text-sm transition-all duration-300 ease-in-out group-hover:translate-x-1 group-hover:-translate-y-1 bg-white gap-4">
          <div className="flex flex-col gap-1">
            <div className="w-4 h-px bg-black rounded-full" />
            <div className="w-2 h-px bg-black rounded-full" />
          </div>
          <div>Menu</div>
        </div>
        <div className="w-[calc(100%-2px)] ml-px absolute top-0 z-0 rounded-full transition-all duration-300 h-12 bg-black" />
      </motion.div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "100vh" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed top-0 left-0 w-screen bg-cream z-40 overflow-hidden"
          >
            <div className="w-screen h-screen overflow-scroll pt-40 pb-20">
              <div onClick={backHome}>Back Home</div>
              {projects.map((project) => (
                <Item
                  key={project._id}
                  project={project}
                  setIsMenuOpen={setIsMenuOpen}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
