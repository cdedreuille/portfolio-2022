import { getSvgPathFromStroke } from "./utils";
import getStroke from "perfect-freehand";
import { motion } from "framer-motion";

type Props = {
  id?: string;
  points: number[][];
  onPointerDown?: (e: React.PointerEvent) => void;
};

export default function Path({ onPointerDown, points, id }: Props) {
  return (
    <motion.path
      key={id}
      onPointerDown={onPointerDown}
      d={getSvgPathFromStroke(
        getStroke(points, {
          size: 6,
        })
      )}
      fill="#ffffff"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  );
}
