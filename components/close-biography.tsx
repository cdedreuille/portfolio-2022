import { FC } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  aboutState: "closed" | "hover" | "active";
  setAboutState: (state: "closed" | "hover" | "active") => void;
}

export const CloseBiography: FC<Props> = ({ aboutState, setAboutState }) => {
  return (
    <AnimatePresence>
      {aboutState === "active" && (
        <motion.div
          key="about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute top-11 right-11 z-30"
          onClick={() => setAboutState("closed")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="27"
            height="26"
            fill="none"
          >
            <path stroke="#fff" d="m.646 25.646 25-25M1.354.646l25 25" />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
