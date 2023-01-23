import { FC, useEffect } from "react";
import { ProjectProps } from "types";
import Gradient from "javascript-color-gradient";
import useSound from "use-sound";
import { Item } from "./list-item";
import { useGlobal } from "./global-provider";

interface Props {
  projects: ProjectProps[];
}

export const List: FC<Props> = ({ projects }) => {
  const { activePreview } = useGlobal();
  const colorArr = new Gradient()
    .setColorGradient("#EBEEF3", "#EBEEF3")
    .setMidpoint(projects.length)
    .getColors();

  const [play] = useSound("/sounds/list.mp4");

  useEffect(() => {
    if (activePreview) play();
  }, [activePreview, play]);

  return (
    <div className="md:mt-20 mb-12 sm:mb-40">
      {projects.map((project, index) => (
        <Item
          key={project._id}
          isFirst={index === 0}
          isLast={index === projects.length - 1}
          project={project}
          color={colorArr[index]}
        />
      ))}
    </div>
  );
};
