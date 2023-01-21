"use client";

import { useWindowSize } from "hooks/useWindowSize";
import { FC, useState } from "react";
import { IntroDesktop } from "./intro-desktop";
import { IntroMobile } from "./intro-mobile";
import { List } from "./list";

export const Intro: FC = () => {
  const { width } = useWindowSize();
  const [activeProject, setActiveProject] = useState<string | null>(null);

  if (!width) return null;

  return (
    <div className="relative z-10">
      {width > 768 && <IntroDesktop />}
      {width <= 768 && <IntroMobile />}
    </div>
  );
};
