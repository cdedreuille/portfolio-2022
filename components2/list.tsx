import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { FC, useRef } from "react";
import { ProjectProps } from "../types";

interface Props {
  data: ProjectProps[];
}

function Item({ project, color }: { project: ProjectProps; color: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["1 1", "0 0"],
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.4, 0.45, 0.55, 0.6, 1],
    [
      "#FBF7F2",
      "#FBF7F2",
      color || "#FBF7F2",
      color || "#FBF7F2",
      "#FBF7F2",
      "#FBF7F2",
    ]
  );

  const newOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.45, 0.55, 0.7, 1],
    [0, 0, 1, 1, 0, 0]
  );

  // const superWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <Link
      href={`/?project=${project.slug}`}
      as={`/${project.slug}`}
      className="block h-20 relative"
      ref={ref}
    >
      <div className="relative z-10 flex justify-between items-center gap-8 py-2 px-12">
        {/* <div className="h-1 w-10 absolute top-0 right-0 bg-black">
          <motion.div className="h-full bg-red" style={{ width: superWidth }} />
        </div> */}
        <div className="text-xs sm:text-base">
          {project.client} - {project.name}
        </div>
        <div className="uppercase text-xs sm:text-sm">
          {project.tags && project.tags[0].name}
        </div>
      </div>
      <motion.div
        className="absolute w-full h-full top-0 left-0 bg-emerald-200"
        style={{ backgroundColor: color, opacity: newOpacity }}
      />
    </Link>
  );
}

export const List: FC<Props> = ({ data }) => {
  const colors = [
    "#FEA8BD",
    "#F1A0BE",
    "#E69ABF",
    "#DB93C0",
    "#CF8CC1",
    "#C587C2",
    "#B980C3",
    "#AE7AC4",
    "#A373C5",
    "#976DC6",
    "#8C66C7",
    "#8160C8",
    "#7559C9",
    "#6A53CA",
    "#5446CB",
    "#4A40CC",
    "#3F3ACD",
    "#3434CE",
    "#272CCF",
  ];
  return (
    <div>
      {data.map((project, index) => (
        <Item key={project._id} project={project} color={colors[index]} />
      ))}
    </div>
  );
};
