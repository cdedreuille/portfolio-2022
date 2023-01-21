"use client";

import { createContext, useContext, useState } from "react";

interface Props {
  activeProject: string | null;
  setActiveProject: (project: string | null) => void;
}

const globalContext = createContext<Props>({
  activeProject: null,
  setActiveProject: () => {},
});

export function GlobalProvider({ children }: { children: React.ReactNode }) {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const value = {
    activeProject,
    setActiveProject,
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
