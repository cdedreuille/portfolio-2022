import Image from "next/image";
import { FC } from "react";
import { ProjectProps } from "../types";
import { linkLinkedIn, linkMail, linkTwitter, name, text } from "../content";

interface Props {
  data: ProjectProps[];
}

const Button: FC<{ children: string; href: string }> = ({ children, href }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="border border-white px-6 py-3 rounded-full text-sm text-white bg-black"
    >
      {children}
    </a>
  );
};

export const HomeMobile: FC<Props> = ({ data }) => {
  return (
    <div className="bg-black w-full sm:hidden">
      <div className="relative h-[400px]">
        <Image
          src="/charles-dedreuille.jpg"
          fill
          alt={name}
          priority
          className="object-cover"
          sizes="(max-width: 500px) 100vw, (max-width: 500px) 100vw, 100vw"
        />
      </div>
      <div className="text-base font-medium text-gray p-6 -mt-10 relative z-10">
        <span className="text-white">{name}</span> {text}
      </div>
      <div className="flex gap-4 fixed bottom-8 z-[200] left-1/2 -translate-x-1/2">
        <Button href={linkLinkedIn}>LinkedIn</Button>
        <Button href={linkMail}>Mail</Button>
        <Button href={linkTwitter}>Twitter</Button>
      </div>
    </div>
  );
};
