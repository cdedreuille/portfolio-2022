import { FC } from "react";

interface Props {
  children: React.ReactNode;
  href?: string;
  backgroundColor: string | undefined;
  primaryColor: string | undefined;
}

export const Button2: FC<Props> = ({
  children,
  href,
  backgroundColor,
  primaryColor,
}) => {
  return (
    <div className="group relative h-16">
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="relative z-10 font-mono uppercase border border-black text-black px-8 h-16 flex items-center rounded-full text-sm transition-all duration-300 ease-in-out group-hover:translate-x-1 group-hover:-translate-y-1"
        style={{
          backgroundColor,
          color: primaryColor,
          borderColor: primaryColor,
        }}
      >
        {children}
      </a>
      <div
        className="w-full absolute top-0 z-0 rounded-full transition-all duration-300 h-16"
        style={{ backgroundColor: primaryColor }}
      />
    </div>
  );
};
