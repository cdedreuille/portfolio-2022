import { motion } from "framer-motion";
import { FC } from "react";
import { ProjectProps } from "../types";
import classNames from "classnames";

interface Props {
  project: ProjectProps;
  isActive: boolean;
  index: number;
  slide: number;
  children: React.ReactNode;
}

const variants = {
  firstClosed: { width: "50vw", left: 0 },
  first: {
    width: "calc(50vw - 60px)",
    left: 40,
  },
  second: {
    width: "calc(50vw - 60px)",
    left: "calc(50vw + 20px)",
  },
  before: {
    width: 0,
    left: 0,
  },
  after: {
    width: 0,
    left: "100vw",
  },
  inactive: {
    top: 0,
    bottom: 0,
    borderRadius: 0,
  },
  active: {
    top: 40,
    bottom: 40,
    borderRadius: 8,
  },
};

export const Slide: FC<Props> = ({
  project,
  isActive,
  index,
  slide,
  children,
}) => {
  const beforeSlide = index < slide;
  const activeSlide = slide === index;
  const secondSlide = slide === index - 1;
  const afterSlide = index > slide + 1;

  const theVariant = () => {
    if (isActive) {
      if (beforeSlide) return ["before", "active"];
      if (activeSlide) return ["first", "active"];
      if (secondSlide) return ["second", "active"];
      if (afterSlide) return ["after", "active"];
    }
    if (beforeSlide) return ["before", "inactive"];
    if (activeSlide) return ["firstClosed", "inactive"];
    if (secondSlide) return ["second", "inactive"];
    if (afterSlide) return ["after", "inactive"];
  };

  if (project.content)
    return (
      <motion.div
        initial={false}
        animate={theVariant()}
        transition={{ duration: 0.6 }}
        variants={variants}
        className={classNames("absolute overflow-hidden", {
          "z-[0]": project.content.length - index === 0,
          "z-[1]": project.content.length - index === 1,
          "z-[2]": project.content.length - index === 2,
          "z-[3]": project.content.length - index === 3,
          "z-[4]": project.content.length - index === 4,
          "z-[5]": project.content.length - index === 5,
          "z-[6]": project.content.length - index === 6,
          "z-[7]": project.content.length - index === 7,
          "z-[8]": project.content.length - index === 8,
          "z-[9]": project.content.length - index === 9,
          "z-[10]": project.content.length - index === 10,
          "z-[11]": project.content.length - index === 11,
          "z-[12]": project.content.length - index === 12,
        })}
      >
        {children}
      </motion.div>
    );

  return null;
};
