import { FC } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Props {}

export const Ellipse: FC<Props> = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-screen justify-center items-center flex z-0">
      <svg
        viewBox="0 0 900 900"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        className="h-[calc(100vh-80px)] w-[calc(100vw-80px)]"
      >
        <mask id="mask">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <path
            fill="#000"
            d="M870.288 599.246A446 446 0 0 1 227.41 836.484 446.004 446.004 0 0 1 7.198 396.688a445.998 445.998 0 0 1 318.306-374.96 445.998 445.998 0 0 1 256.784 2.343l-.661 2.13A443.772 443.772 0 0 0 53.194 648.686a443.767 443.767 0 0 0 424.082 244.244A443.773 443.773 0 0 0 868.186 598.5l2.102.746Z"
          />
        </mask>
        <motion.image
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 10,
            ease: "linear",
          }}
          xlinkHref="/holo.png"
          x="0"
          y="0"
          width="100%"
          height="100%"
        ></motion.image>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="#FBF7F2"
          mask="url(#mask)"
        />
      </svg>
      {/* <motion.div
        className="w-full h-full bg-emerald-300 absolute top-0 left-0 z-0"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 10,
          ease: "linear",
        }}
      >
        <Image alt="Holo" src="/gradiant.jpg" fill />
      </motion.div> */}
      {/* <motion.image
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 10,
          ease: "linear",
        }}
        mask="url(#mask)"
        xlinkHref="https://img.freepik.com/free-vector/abstract-hologram-gradient-background_1048-10069.jpg?w=360"
        x="0"
        y="0"
        width="100%"
        height="100%"
      ></motion.image> */}
    </div>
  );
};
