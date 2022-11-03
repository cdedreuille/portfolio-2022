import Image from "next/image";
import profilePic from "../public/charles.png";

export const HomeMobile = () => {
  return (
    <div className="bg-black w-full sm:hidden mb-20 sm:mb-0">
      <Image src={profilePic} alt="Charles de Dreuille" priority />
      <div className="text-base font-medium text-gray p-6 -mt-40">
        <span className="text-white">Charles de Dreuille</span> is a digital
        product enthousiast from London — Connect design and engineering for
        humans of this world. For the past 12 years I had the chance to work for
        companies like Meta, Christian Louboutin, Deliveroo, Soho House and a
        handful of entrepreneurs delivering delightful experiences for their
        users.
      </div>
      <div className="flex gap-4 fixed bottom-8 z-20 left-1/2 -translate-x-1/2">
        <button className="border border-white px-4 py-3 rounded-full text-sm text-white bg-black">
          Mail
        </button>
        <button className="border border-white px-4 py-3 rounded-full text-sm text-white bg-black">
          LinkedIn
        </button>
        <button className="border border-white px-4 py-3 rounded-full text-sm text-white bg-black">
          Instagram
        </button>
      </div>
    </div>
  );
};
