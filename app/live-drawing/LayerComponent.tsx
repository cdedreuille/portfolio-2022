import { useStorage } from "../../liveblocks.config";
import React, { memo } from "react";
import Path from "./Path";
import { LayerType } from "../../types";
import { colorToCss } from "./utils";

type Props = {
  id: string;
  selectionColor?: string;
};

const LayerComponent = memo(({ id, selectionColor }: Props) => {
  const layer = useStorage((root) => root.layers.get(id));
  if (!layer) {
    return null;
  }

  switch (layer.type) {
    case LayerType.Path:
      return (
        <Path
          key={id}
          points={layer.points}
          x={layer.x}
          y={layer.y}
          fill={layer.fill ? colorToCss(layer.fill) : "#CCC"}
          stroke={selectionColor}
        />
      );
    default:
      console.warn("Unknown layer type");
      return null;
  }
});

export default LayerComponent;

LayerComponent.displayName = "LayerComponent";
