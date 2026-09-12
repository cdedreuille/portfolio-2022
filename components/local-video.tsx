import { CSSProperties, FC } from "react";

interface Props {
  src?: string;
  controls?: boolean;
  className?: string;
  style?: CSSProperties;
}

export const LocalVideo: FC<Props> = ({ src, controls, className, style }) => {
  if (!src) return null;

  return (
    <video
      src={src}
      muted
      autoPlay
      loop
      playsInline
      controls={controls}
      className={className}
      style={style}
    />
  );
};
