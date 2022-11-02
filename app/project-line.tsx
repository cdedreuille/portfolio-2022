import { FC } from "react";
import { ProjectProps } from "../types";

interface Props {
  project: ProjectProps;
}

export const ProjectLine: FC<Props> = ({ project }) => {
  return (
    <div
      key={project._id}
      className="border-b border-black pb-4 mb-4 flex justify-between"
    >
      <div className="text-base">
        {project.client} - {project.name}
      </div>
      <div className="uppercase text-sm">{project.type}</div>
    </div>
  );
};
