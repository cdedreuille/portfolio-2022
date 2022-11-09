import Image from "next/image";
import { FC } from "react";
import profilePic from "../public/charles-dedreuille.jpg";
import { linkLinkedIn, linkMail, linkTwitter, name, text } from "./content";
import LiveDrawing from "./live-drawing";

const Button: FC<{ children: string; href: string }> = ({ children, href }) => {
  return (
    <div className="group relative">
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 bg-red border border-black px-8 py-2 rounded-full text-base block cursor-pointer transition-transform"
      >
        {children}
      </a>
      <div className="bg-black w-full h-full absolute top-0 z-0 rounded-full" />
    </div>
  );
};

export const HomeDesktop = () => {
  return (
    <div>
      <div className="bg-red h-screen fixed z-0 top-0 left-0 w-full hidden sm:flex">
        <div className="flex-1 p-12 flex flex-col justify-between">
          <div className="max-w-xl text-base font-medium">
            <span className="text-white">{name}</span> {text}
          </div>
          <div>
            <div className="text-xl mb-8">Want to work together?</div>
            <div className="flex gap-4">
              <Button href={linkMail}>Mail</Button>
              <Button href={linkLinkedIn}>LinkedIn</Button>
              <Button href={linkTwitter}>Twitter</Button>
            </div>
          </div>
        </div>
        <div className="w-[50%] bg-cream relative overflow-hidden">
          <LiveDrawing />
          <Image
            src={profilePic}
            alt={name}
            fill
            className="object-cover"
            priority
            quality={100}
            sizes="(max-width: 500px) 100vw, (max-width: 500px) 100vw, 100vw"
          />
        </div>
      </div>
    </div>
  );
};
