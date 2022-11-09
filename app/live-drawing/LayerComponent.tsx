import { useStorage } from "../../liveblocks.config";
import React, { memo } from "react";
import Path from "./Path";
import { LayerType } from "../../types";

type Props = {
  id: string;
};

const LayerComponent = memo(({ id }: Props) => {
  const layer = useStorage((root) => root.layers.get(id));
  if (!layer) {
    return null;
  }

  switch (layer.type) {
    case LayerType.Path:
      return <Path key={id} points={layer.points} />;
    default:
      console.warn("Unknown layer type");
      return null;
  }
});

export default LayerComponent;

LayerComponent.displayName = "LayerComponent";
