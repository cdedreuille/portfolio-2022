import Link from "next/link";
import { FC } from "react";
import { ProjectProps } from "../types";

interface Props {
  project: ProjectProps;
  setProjectHover: (id: string | null) => void;
  setProjectActive: (id: string | null) => void;
  isActive: boolean;
}

export const ProjectLine: FC<Props> = ({
  project,
  setProjectHover,
  setProjectActive,
  isActive,
}) => {
  return (
    <div
      onMouseEnter={() => !isActive && setProjectHover(project._id)}
      onMouseLeave={() => !isActive && setProjectHover(null)}
      onClick={() => setProjectActive(project._id)}
    >
      <Link
        href={`/?project=${project.slug}`}
        as={`/${project.slug}`}
        className="border-b border-black gap-8 py-2 flex justify-between sm:hover:pl-4 sm:transition-all sm:duration-300 items-center"
      >
        <div className="text-xs sm:text-base">
          {project.client} - {project.name}
        </div>
        <div className="uppercase text-xs sm:text-sm">{project.type}</div>
      </Link>
    </div>
  );
};
