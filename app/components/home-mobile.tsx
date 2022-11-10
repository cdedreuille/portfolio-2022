import Image from "next/image";
import { FC } from "react";
import profilePic from "../../public/charles-dedreuille.jpg";
import { linkLinkedIn, linkMail, linkTwitter, name, text } from "../content";

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

export const HomeMobile = () => {
  return (
    <div className="bg-black w-full sm:hidden">
      <div className="relative h-[400px]">
        <Image
          src={profilePic}
          fill
          alt={name}
          priority
          className="object-cover"
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
