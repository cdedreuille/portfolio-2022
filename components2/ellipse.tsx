import { FC } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const Ellipse: FC = () => {
  const { scrollYProgress } = useScroll({});
  const newOpacity = useTransform(scrollYProgress, [0, 0.2, 1], [1, 0, 0]);
  const newRotate = useTransform(scrollYProgress, [0, 1], [0, -180]);

  return (
    <motion.div
      className="fixed top-0 left-0 h-screen w-screen justify-center items-center flex z-0"
      style={{ opacity: newOpacity, rotate: newRotate }}
    >
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
            d="M855.542 641.893c.674.319.961 1.124.64 1.797a449.993 449.993 0 0 1-403.9 256.304A449.996 449.996 0 0 1 97.745 169.971 449.996 449.996 0 0 1 548.918 11.007a1.347 1.347 0 0 1 1.016 1.614 1.353 1.353 0 0 1-1.618 1.018 447.3 447.3 0 1 0 305.426 628.896 1.354 1.354 0 0 1 1.8-.642Z"
          />
        </mask>
        <motion.image
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 4,
            ease: "linear",
          }}
          xlinkHref="/holo.png"
          x="0"
          y="0"
          width="100%"
          height="100%"
        ></motion.image>
        <motion.image
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 4,
            ease: "linear",
          }}
          xlinkHref="/circle-1.png"
          x="0"
          y="0"
          width="100%"
          height="100%"
        ></motion.image>
        <motion.image
          animate={{ rotate: -360 }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 3,
            ease: "linear",
          }}
          xlinkHref="/circle-1.png"
          x="0"
          y="0"
          width="100%"
          height="100%"
        ></motion.image>
        <motion.image
          animate={{ rotate: -360 }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 6,
            ease: "linear",
          }}
          xlinkHref="/circle-1.png"
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
    </motion.div>
  );
};
