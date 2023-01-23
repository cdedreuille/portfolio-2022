import { useWindowSize } from "hooks/useWindowSize";
import { FC } from "react";
import { IntroDesktop } from "./intro-desktop";
import { IntroMobile } from "./intro-mobile";

export const Intro: FC = () => {
  const { width } = useWindowSize();

  if (!width) return null;

  return (
    <div className="relative z-10 md:min-h-screen">
      {width > 768 && <IntroDesktop />}
      {width <= 768 && <IntroMobile />}
    </div>
  );
};
