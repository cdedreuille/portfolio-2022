import Image from "next/image";
import profilePic from "../public/charles.png";

export const HomeDesktop = () => {
  return (
    <div className="bg-red h-screen fixed z-0 top-0 left-0 w-full hidden sm:flex">
      <div className="flex-1 p-12 flex flex-col justify-between">
        <div className="max-w-xl text-base font-medium">
          <span className="text-white">Charles de Dreuille</span> is a digital
          product enthousiast from London — Connect design and engineering for
          humans of this world. For the past 12 years I had the chance to work
          for companies like Meta, Christian Louboutin, Deliveroo, Soho House
          and a handful of entrepreneurs delivering delightful experiences for
          their users.
        </div>
        <div>
          <div className="text-xl mb-8">Want to work together?</div>
          <div className="flex gap-4">
            <button className="border border-black px-8 py-2 rounded-full text-base">
              Mail
            </button>
            <button className="border border-black px-8 py-2 rounded-full text-base">
              LinkedIn
            </button>
            <button className="border border-black px-8 py-2 rounded-full text-base">
              Instagram
            </button>
          </div>
        </div>
      </div>
      <div className="w-[50%] max-w-4xl bg-cream relative">
        <Image
          src={profilePic}
          alt="Charles de Dreuille"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 896px) 448px, 400px"
        />
      </div>
    </div>
  );
};
