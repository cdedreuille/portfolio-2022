import { FC } from "react";
import { ProjectProps } from "../../types";

interface Props {
  project: ProjectProps;
}

export const ProjectLine: FC<Props> = ({ project }) => {
  return (
    <div className="border-b border-black gap-8 py-4 flex justify-between sm:hover:bg-white sm:hover:px-4 sm:transition-all sm:duration-300 items-center">
      <div className="text-xs sm:text-base">
        {project.client} - {project.name}
      </div>
      <div className="uppercase text-xs sm:text-sm">{project.type}</div>
    </div>
  );
};
