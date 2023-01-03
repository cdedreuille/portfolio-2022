import { FC } from "react";

export const Button: FC<{ children: string; href: string }> = ({
  children,
  href,
}) => {
  return (
    <div className="group relative">
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="relative z-10 border border-black text-black bg-cream px-8 py-2 rounded-full text-base block transition-all duration-300 ease-in-out group-hover:translate-x-1 group-hover:-translate-y-1"
      >
        {children}
      </a>
      <div className="group-hover:bg-black w-full h-full absolute top-0 z-0 rounded-full transition-all duration-300" />
    </div>
  );
};
