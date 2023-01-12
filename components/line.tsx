import { FC } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export const Line: FC = () => {
  return (
    <div className="w-full h-[2px] overflow-hidden relative">
      <Image src="/holo.png" alt="holo" fill className="object-cover" />
    </div>
  );
};
