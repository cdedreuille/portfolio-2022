import { FC } from "react";
import { ProjectProps } from "../types";

interface Props {
  project: ProjectProps;
}

export const ProjectLine: FC<Props> = ({ project }) => {
  return (
    <div className="border-b border-black py-4 flex justify-between hover:bg-white hover:px-4 transition-all duration-300 cursor-pointer items-center">
      <div className="text-base">
        {project.client} - {project.name}
      </div>
      <div className="uppercase text-sm">{project.type}</div>
    </div>
  );
};
