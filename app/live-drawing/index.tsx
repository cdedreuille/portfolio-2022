"use client";

import {
  useMutation,
  RoomProvider,
  useStorage,
  useSelf,
} from "../../liveblocks.config";
import { ClientSideSuspense } from "@liveblocks/react";
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import React, { useState } from "react";
import { Layer, Camera, Point } from "../../types";
import { penPointsToPathLayer, pointerEventToCanvasPoint } from "./utils";
import { nanoid } from "nanoid";
import LayerComponent from "./LayerComponent";
import MultiplayerGuides from "./MultiplayerGuides";
import Path from "./Path";

function Canvas() {
  const layerIds = useStorage((root) => root.layerIds);

  const pencilDraft = useSelf((me) => me.presence.pencilDraft);
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });

  /**
   * Transform the drawing of the current user in a layer and reset the presence to delete the draft.
   */
  const insertPath = useMutation(({ storage, self, setMyPresence }) => {
    const liveLayers = storage.get("layers");
    const { pencilDraft } = self.presence;
    if (
      pencilDraft == null ||
      pencilDraft.length < 2 ||
      liveLayers.size >= 100
    ) {
      setMyPresence({ pencilDraft: null });
      return;
    }

    const id = nanoid();
    liveLayers.set(id, new LiveObject(penPointsToPathLayer(pencilDraft)));

    const liveLayerIds = storage.get("layerIds");
    liveLayerIds.push(id);
    setMyPresence({ pencilDraft: null });
  }, []);

  /**
   * Insert the first path point and start drawing with the pencil
   */
  const startDrawing = useMutation(
    ({ setMyPresence }, point: Point, pressure: number) => {
      setMyPresence({
        pencilDraft: [[point.x, point.y, pressure]],
      });
    },
    []
  );

  /**
   * Continue the drawing and send the current draft to other users in the room
   */
  const continueDrawing = useMutation(
    ({ self, setMyPresence }, point: Point, e: React.PointerEvent) => {
      const { pencilDraft } = self.presence;
      if (pencilDraft == null) return;

      setMyPresence({
        cursor: point,
        pencilDraft:
          pencilDraft.length === 1 &&
          pencilDraft[0][0] === point.x &&
          pencilDraft[0][1] === point.y
            ? pencilDraft
            : [...pencilDraft, [point.x, point.y, e.pressure]],
      });
    },
    []
  );

  // When the mouse is down
  const onPointerDown = React.useCallback(
    (e: React.PointerEvent) => {
      const current = pointerEventToCanvasPoint(e);
      startDrawing(current, e.pressure);
      return;
    },
    [startDrawing]
  );

  // When the mouse move
  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();
      const current = pointerEventToCanvasPoint(e);

      continueDrawing(current, e);
      setMyPresence({ cursor: current });
    },
    [continueDrawing]
  );

  // When the mouse is getting out of screen
  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
  }, []);

  // When the mouse is up
  const onPointerUp = useMutation(() => {
    insertPath();
  }, [insertPath]);

  return (
    <div className="absolute z-20 top-0 left-1/2 -translate-x-1/2 w-[10000px] h-screen touch-none">
      <svg
        className="w-full h-full"
        viewBox="0 0 2048 1366"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onPointerUp={onPointerUp}
      >
        {layerIds.map((layerId) => (
          <LayerComponent key={layerId} id={layerId} />
        ))}
        <MultiplayerGuides />

        {/* Drawing in progress. Still not commited to the storage. */}
        {pencilDraft != null && pencilDraft.length > 0 && (
          <Path points={pencilDraft} fill="#ffffff" />
        )}
      </svg>
    </div>
  );
}

function Loading() {
  return (
    <div className="absolute w-full h-full flex justify-center items-center">
      Loading
    </div>
  );
}

export default function Room() {
  const roomId = "portfolio-test-8";

  return (
    <RoomProvider
      id={roomId}
      initialPresence={{
        selection: [],
        cursor: null,
        pencilDraft: null,
      }}
      initialStorage={{
        layers: new LiveMap<string, LiveObject<Layer>>(),
        layerIds: new LiveList(),
      }}
    >
      <ClientSideSuspense fallback={<Loading />}>
        {() => <Canvas />}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
