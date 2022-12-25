import { motion } from "framer-motion";
import { FC } from "react";
import classNames from "classnames";

interface Props {
  aboutState: "closed" | "hover" | "active";
}

export const HomeVideo: FC<Props> = ({ aboutState }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={classNames("fixed h-screen top-0 bg-cream left-[50vw] w-1/2", {
        "z-[90]": aboutState === "hover" || aboutState === "active",
        "z-[110]": aboutState === "closed",
      })}
    >
      <div className="absolute w-[50vw] overflow-hidden top-0 left-0 bottom-0">
        <video
          src="/rocks.mp4"
          autoPlay
          muted
          loop
          className="object-cover h-full w-full"
        />
      </div>
    </motion.div>
  );
};
