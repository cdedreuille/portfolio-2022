import { FC } from "react";
import { ProjectProps } from "../types";

interface Props {
  project: ProjectProps;
}

export const Project: FC<Props> = () => {
  return <div className="h-[4000px] w-full bg-slate-700">Hello</div>;
};
