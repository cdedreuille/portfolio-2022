import { FC } from "react";
import { ProjectProps } from "../types";

interface Props {
  project: ProjectProps;
}

export const ProjectLine: FC<Props> = ({ project }) => {
  return (
    <div className="border-b border-black py-4 flex justify-between sm:hover:bg-white sm:hover:px-4 sm:transition-all sm:duration-300 sm:cursor-pointer items-center">
      <div className="text-base">
        {project.client} - {project.name}
      </div>
      <div className="uppercase text-sm">{project.type}</div>
    </div>
  );
};
