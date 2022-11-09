import { getSvgPathFromStroke } from "./utils";
import getStroke from "perfect-freehand";

type Props = {
  points: number[][];
  onPointerDown?: (e: React.PointerEvent) => void;
};

export default function Path({ onPointerDown, points }: Props) {
  return (
    <path
      onPointerDown={onPointerDown}
      d={getSvgPathFromStroke(
        getStroke(points, {
          size: 6,
        })
      )}
      fill="#ffffff"
    />
  );
}
