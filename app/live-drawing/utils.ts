import { Point, PathLayer } from "../../types";

export function getSvgPathFromStroke(stroke: number[][]) {
  if (!stroke.length) return "";

  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length];
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
      return acc;
    },
    ["M", ...stroke[0], "Q"]
  );

  d.push("Z");
  return d.join(" ");
}

export function penPointsToPathLayer(points: number[][]): PathLayer {
  if (points.length < 2) {
    throw new Error("Can't transform points with less than 2 points");
  }

  return {
    points: points,
  };
}

export function pointerEventToCanvasPoint(e: React.PointerEvent): Point {
  const imageWidth = (window.innerHeight * 2048) / 1366;
  const halfScreen = window.innerWidth / 2;
  const imageLeftSpace = (halfScreen - imageWidth) / 2;
  const posInCanvas = halfScreen + imageLeftSpace;
  const canvasXPos = e.clientX - posInCanvas;
  const canvasXPosScale = (canvasXPos * 2048) / imageWidth;
  const canvasYPos = (e.clientY * 1366) / window.innerHeight;

  const point = {
    x: Math.round(canvasXPosScale),
    y: Math.round(canvasYPos),
  };

  return point;
}
