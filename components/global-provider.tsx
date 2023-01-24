import useLockedBody from "hooks/useLockedBody";
import { createContext, useContext, useState } from "react";
import { ProjectProps } from "types";

interface Props {
  activePreview: ProjectProps | null;
  setActivePreview: (project: ProjectProps | null) => void;
  activeProject: ProjectProps | null;
  setActiveProject: (project: ProjectProps | null) => void;
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
  const [activePreview, setActivePreview] = useState<ProjectProps | null>(null);
  const [activeProject, setActiveProject] = useState<ProjectProps | null>(null);
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
