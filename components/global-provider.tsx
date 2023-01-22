"use client";

import useLockedBody from "hooks/useLockedBody";
import { createContext, useContext, useState } from "react";

interface Props {
  activePreview: string | null;
  setActivePreview: (project: string | null) => void;
  activeProject: string | null;
  setActiveProject: (project: string | null) => void;
  locked: boolean;
  setLocked: (locked: boolean) => void;
}

const globalContext = createContext<Props>({
  activePreview: null,
  setActivePreview: () => {},
  activeProject: null,
  setActiveProject: () => {},
  locked: false,
  setLocked: () => {},
});

export function GlobalProvider({ children }: { children: React.ReactNode }) {
  const [activePreview, setActivePreview] = useState<string | null>(null);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [locked, setLocked] = useLockedBody(false, "root");

  const value = {
    activePreview,
    setActivePreview,
    activeProject,
    setActiveProject,
    locked,
    setLocked,
  };

  return (
    <globalContext.Provider value={value}>{children}</globalContext.Provider>
  );
}

export function useGlobal() {
  const context = useContext(globalContext);
  if (context === undefined) {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }
  return context;
}
