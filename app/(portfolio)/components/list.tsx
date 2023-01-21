"use client";

import { FC, useEffect, useState } from "react";
import { ProjectProps } from "types";
import Gradient from "javascript-color-gradient";
import useSound from "use-sound";
import { Item } from "./list-item";

interface Props {
  data: ProjectProps[];
}

export const List: FC<Props> = ({ data }) => {
  const [activeLine, setActiveLine] = useState<string | null>(null);
  const colorArr = new Gradient()
    .setColorGradient("#EBEEF3", "#EBEEF3")
    .setMidpoint(data.length)
    .getColors();

  const [play] = useSound("/sounds/list.mp4");

  useEffect(() => {
    if (activeLine) play();
  }, [activeLine, play]);

  return (
    <div className="md:mt-20 mb-12 sm:mb-40">
      {data.map((project, index) => (
        <Item
          key={project._id}
          isFirst={index === 0}
          isLast={index === data.length - 1}
          project={project}
          color={colorArr[index]}
          activeLine={activeLine}
          setActiveLine={setActiveLine}
        />
      ))}
    </div>
  );
};
