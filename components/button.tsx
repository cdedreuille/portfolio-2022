import { FC } from "react";

interface Props {
  children: React.ReactNode;
  href?: string;
  isCircle?: boolean;
}

export const Button: FC<Props> = ({ children, href, isCircle }) => {
  return (
    <div className="group relative h-10">
      {isCircle && (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="relative z-10 border border-black text-black bg-cream w-10 h-10 flex items-center justify-center rounded-full text-md transition-all duration-300 ease-in-out group-hover:translate-x-1 group-hover:-translate-y-1"
        >
          {children}
        </a>
      )}
      {!isCircle && (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="relative z-10 font-mono uppercase border border-black text-black bg-cream px-6 h-10 flex items-center rounded-full text-sm transition-all duration-300 ease-in-out group-hover:translate-x-1 group-hover:-translate-y-1"
        >
          {children}
        </a>
      )}
      <div className="group-hover:bg-black w-full absolute top-0 z-0 rounded-full transition-all duration-300 h-10" />
    </div>
  );
};
