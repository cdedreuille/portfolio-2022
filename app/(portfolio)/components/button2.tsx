import { FC } from "react";

interface Props {
  children: React.ReactNode;
  href?: string;
  isCircle?: boolean;
}

export const Button2: FC<Props> = ({ children, href }) => {
  return (
    <div className="group relative h-16">
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="relative z-10 font-mono uppercase border border-black text-black bg-cream px-8 h-16 flex items-center rounded-full text-sm transition-all duration-300 ease-in-out group-hover:translate-x-1 group-hover:-translate-y-1"
      >
        {children}
      </a>
      <div className="group-hover:bg-black w-full absolute top-0 z-0 rounded-full transition-all duration-300 h-16" />
    </div>
  );
};
