import Link from "next/link";
import { FC } from "react";
import { ProjectProps } from "../types";

interface Props {
  data: ProjectProps[];
}

export const List: FC<Props> = ({ data }) => {
  return (
    <div>
      {data.map((project) => (
        <div key={project._id}>
          <Link
            href={`/?project=${project.slug}`}
            as={`/${project.slug}`}
            className="border-b border-black gap-8 py-2 px-8 flex justify-between sm:hover:pl-12 sm:transition-all sm:duration-500 items-center"
          >
            <div className="text-xs sm:text-base">
              {project.client} - {project.name}
            </div>
            <div className="uppercase text-xs sm:text-sm">
              {project.tags && project.tags[0].name}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};
