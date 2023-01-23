import classNames from "classnames";
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
  return (
    <div
      className={classNames({
        "col-span-1": content && content?.width === 1,
        "col-span-2": content.width === 2,
        "col-span-3": content.width === 3,
        "col-span-4": content.width === 4,
        "col-span-5": content.width === 5,
        "col-span-6": content.width === 6,
        "col-span-7": content.width === 7,
        "col-span-8": content.width === 8,
        "col-span-9": content.width === 9,
        "col-span-10": content.width === 10,
        "col-span-11": content.width === 11,
        "col-span-12": content.width === 12 || !content.width,
        "col-start-1": content.start === 1 || !content.start,
        "col-start-2": content.start === 2,
        "col-start-3": content.start === 3,
        "col-start-4": content.start === 4,
        "col-start-5": content.start === 5,
        "col-start-6": content.start === 6,
        "col-start-7": content.start === 7,
        "col-start-8": content.start === 8,
        "col-start-9": content.start === 9,
        "col-start-10": content.start === 10,
        "col-start-11": content.start === 11,
        "col-start-12": content.start === 12,
      })}
    >
      {children}
    </div>
  );
};
