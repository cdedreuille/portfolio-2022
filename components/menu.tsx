import classNames from "classnames";
import {
  useScroll,
  useTransform,
  motion,
  AnimatePresence,
} from "framer-motion";
import { useWindowSize } from "hooks/useWindowSize";
import { getProjects } from "lib/projects";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useGlobal } from "./global-provider";
import { Item } from "./list-item-menu";
import { Preview } from "./preview";

export const Menu: FC = () => {
  const projects = getProjects();
  const [activePreview, setActivePreview] = useState<
    (typeof projects)[number] | null
  >(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const positionMobile = useTransform(
    scrollYProgress,
    [0, 0.06, 1],
    [32, 20, 20]
  );
  const position = useTransform(scrollYProgress, [0, 0.06, 1], [64, 48, 48]);
  const router = useRouter();
  const { setActiveProject } = useGlobal();
  const { width } = useWindowSize();

  const backHome = () => {
    setActiveProject(null);
    router.push("/", { transitionTypes: ["nav-back"] });
  };

  return (
    <>
      <Preview projects={projects} activePreview={activePreview} />
      <motion.div
        className="flex gap-8 fixed z-20"
        style={{
          left: width && width > 768 ? position : positionMobile,
          top: width && width > 768 ? position : positionMobile,
        }}
      >
        {/* Button 1 */}
        <div
          className="relative group h-12"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div
            className={classNames(
              "relative z-10 font-mono uppercase text-black px-6 h-12 flex items-center rounded-full text-sm transition-all duration-300 ease-in-out group-hover:translate-x-1 group-hover:-translate-y-1 bg-white gap-4 border",
              {
                "border-black": isMenuOpen,
                "border-white": !isMenuOpen,
              }
            )}
          >
            <div className="flex flex-col gap-1">
              <div className="w-4 h-px bg-black rounded-full" />
              <div className="w-2 h-px bg-black rounded-full" />
            </div>
            <div>Menu</div>
          </div>
          <div className="w-[calc(100%-2px)] ml-px absolute top-0 z-0 rounded-full transition-all duration-300 h-12 bg-black" />
        </div>

        {/*  Button 2 */}
        {isMenuOpen && (
          <div className="relative group h-12" onClick={backHome}>
            <div className="relative z-10 font-mono uppercase text-black px-6 h-12 flex items-center rounded-full text-sm transition-all duration-300 ease-in-out group-hover:translate-x-1 group-hover:-translate-y-1 bg-white border border-black">
              <div>Home</div>
            </div>
            <div className="w-[calc(100%-2px)] ml-px absolute top-0 z-0 rounded-full transition-all duration-300 h-12 bg-black" />
          </div>
        )}
      </motion.div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "100vh" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed top-0 left-0 w-screen bg-cream z-10 overflow-hidden"
          >
            <div className="w-screen h-screen overflow-scroll pt-40 pb-20">
              {projects.map((project) => (
                <Item
                  key={project._id}
                  project={project}
                  setActivePreview={setActivePreview}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
