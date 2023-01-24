import { motion } from "framer-motion";
import { FC } from "react";
import { ProjectProps } from "types";
import { useGlobal } from "./global-provider";
import { useRouter } from "next/router";

interface ItemProps {
  project: ProjectProps;
  setIsMenuOpen: (value: boolean) => void;
  setActivePreview: (value: ProjectProps | null) => void;
}

export const Item: FC<ItemProps> = ({ project, setActivePreview }) => {
  const { setActiveProject } = useGlobal();
  const router = useRouter();

  const onClick = () => {
    setActiveProject(project);
    router.push(`/${project.slug}`, undefined, { scroll: false });
  };

  return (
    <motion.div
      onClick={onClick}
      className="group block h-20 sm:h-20 relative overflow-hidden sm:mx-12 rounded-lg"
      initial={{ backgroundColor: "#F4F6FA" }}
      whileHover={{
        backgroundColor: "#EBEEF3",
        transition: {
          duration: 0.6,
          ease: "linear",
        },
      }}
      onHoverStart={() => setActivePreview(project)}
      onHoverEnd={() => setActivePreview(null)}
    >
      <div className="relative z-10 flex items-center gap-8 py-2 px-6 sm:px-8 h-full">
        <div className="text-md w-[220px] text-black hidden sm:flex font-mono uppercase text-sm sm:text-md h-full items-center relative">
          {project.client.name}
        </div>
        <div className="text-sm sm:text-md flex flex-col">
          <div className="sm:hidden font-mono uppercase text-black">
            {project.client.name}
          </div>
          <div className="text-gray-400 sm:text-black font-mono uppercase relative">
            {project.name}
            <div className="absolute w-0 h-px -bottom-1 left-0 bg-black group-hover:w-full transition-all duration-300" />
          </div>
        </div>
        <div className="hidden sm:flex gap-4">
          {project.tags &&
            project.tags.map((tag) => (
              <div
                key={tag._id}
                className="font-mono uppercase text-sm border border-gray-400 text-gray-400 rounded-full px-4 py-1"
              >
                {tag.name}
              </div>
            ))}
        </div>
      </div>
    </motion.div>
  );
};
