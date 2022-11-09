import { getSvgPathFromStroke } from "./utils";
import getStroke from "perfect-freehand";

type Props = {
  points: number[][];
  fill: string;
  onPointerDown?: (e: React.PointerEvent) => void;
  stroke?: string;
};

export default function Path({ onPointerDown, stroke, fill, points }: Props) {
  return (
    <path
      onPointerDown={onPointerDown}
      d={getSvgPathFromStroke(
        getStroke(points, {
          size: 4,
          streamline: 0,
        })
      )}
      fill={fill}
      stroke={stroke}
      strokeWidth={1}
    />
  );
}
