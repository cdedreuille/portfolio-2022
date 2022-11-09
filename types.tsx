export interface ProjectProps {
  _id: string;
  name: string;
  client: string;
  type: string;
  published_at: string;
  blocks?: {
    _key: string;
    _type: string;
    assets?: AssetProps[];
  }[];
}

export interface AssetProps {
  _key: string;
  type: "image" | "mux";
  url?: string;
  width?: number;
  height?: number;
  playbackId?: string;
}

export interface ClientProps {
  _id: string;
  name: string;
}

// Liveblocks Types
////////////////////////////////////////////////////////////////////////////////////

export type Color = {
  r: number;
  g: number;
  b: number;
};

export enum LayerType {
  Rectangle,
  Ellipse,
  Path,
}

export type Camera = {
  x: number;
  y: number;
};

export type Layer = PathLayer;

export type PathLayer = {
  type: LayerType.Path;
  points: number[][];
};

export type Point = {
  x: number;
  y: number;
};

export type XYWH = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export enum Side {
  Top = 1,
  Bottom = 2,
  Left = 4,
  Right = 8,
}
