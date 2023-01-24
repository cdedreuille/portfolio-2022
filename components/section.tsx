import classNames from "classnames";
import { useWindowSize } from "hooks/useWindowSize";
import { FC } from "react";
import {
  ImageBlockProps,
  ParagraphBlockProps,
  TitleBlockProps,
  VideoBlockProps,
} from "types";

interface SectionProps {
  content:
    | ImageBlockProps
    | VideoBlockProps
    | TitleBlockProps
    | ParagraphBlockProps;
  children: React.ReactNode;
}

export const Section: FC<SectionProps> = ({ content, children }) => {
  const { width } = useWindowSize();
  const isMobile = width && width < 768;

  if (!width) return null;

  return (
    <div
      className={classNames({
        "col-span-1": content && content?.width === 1,
        "col-span-2": !isMobile && content.width === 2,
        "col-span-3": !isMobile && content.width === 3,
        "col-span-4": !isMobile && content.width === 4,
        "col-span-5": !isMobile && content.width === 5,
        "col-span-6": !isMobile && content.width === 6,
        "col-span-7": !isMobile && content.width === 7,
        "col-span-8": !isMobile && content.width === 8,
        "col-span-9": !isMobile && content.width === 9,
        "col-span-10": !isMobile && content.width === 10,
        "col-span-11": !isMobile && content.width === 11,
        "col-span-12": (!isMobile && content.width === 12) || !content.width,
        "col-start-1": (!isMobile && content.start === 1) || !content.start,
        "col-start-2": !isMobile && content.start === 2,
        "col-start-3": !isMobile && content.start === 3,
        "col-start-4": !isMobile && content.start === 4,
        "col-start-5": !isMobile && content.start === 5,
        "col-start-6": !isMobile && content.start === 6,
        "col-start-7": !isMobile && content.start === 7,
        "col-start-8": !isMobile && content.start === 8,
        "col-start-9": !isMobile && content.start === 9,
        "col-start-10": !isMobile && content.start === 10,
        "col-start-11": !isMobile && content.start === 11,
        "col-start-12": !isMobile && content.start === 12,
        "col-start-1 col-span-12": isMobile,
      })}
    >
      {children}
    </div>
  );
};
