import { PortableText, PortableTextComponents } from "@portabletext/react";
import classNames from "classnames";
import classnames from "classnames";
import Image from "next/image";
import { FC } from "react";
import {
  ImageBlockProps,
  ParagraphBlockProps,
  ProjectProps,
  TitleBlockProps,
  VideoBlockProps,
} from "types";
import { Button2 } from "./button2";
import { useGlobal } from "./global-provider";

interface Props {
  project: ProjectProps;
}

interface SectionProps {
  content:
    | ImageBlockProps
    | VideoBlockProps
    | TitleBlockProps
    | ParagraphBlockProps;
  children: React.ReactNode;
}

const Section: FC<SectionProps> = ({ content, children }) => {
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

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <div className="text-[30px]">{children}</div>,
  },
};

export const Project: FC<Props> = ({ project }) => {
  const { setActiveProject, setLocked } = useGlobal();

  const close = () => {
    setLocked(false);
    setActiveProject(null);
  };

  return (
    <div
      className={classnames("min-h-screen w-full pb-48", {
        "bg-cream": !project.backgroundColor,
        "text-black": !project.primaryColor,
      })}
      style={{
        backgroundColor: project.backgroundColor?.hex,
        color: project.primaryColor?.hex,
      }}
    >
      <div className="fixed bottom-8 left-12 z-30" onClick={close}>
        <Button2
          backgroundColor={project.backgroundColor?.hex}
          primaryColor={project.primaryColor?.hex}
        >
          Close
        </Button2>
      </div>
      <div className="flex flex-col w-screen h-screen px-12 pt-12 mb-24">
        <div className="flex-1 relative rounded-xl overflow-hidden">
          {project.cover?.type === "image" && project.cover?.image?.url && (
            <Image
              src={project.cover.image.url}
              fill
              alt={project.client.name}
              style={{ objectFit: "cover" }}
            />
          )}
        </div>
        <div className="flex py-12 pl-40 w-full justify-between items-center">
          <div
            className="relative mr-24"
            style={{
              width: project.client.logoWidth || 120,
              height: project.client.logoHeight || 40,
            }}
          >
            {project.client?.logo?.url && (
              <Image
                src={project.client?.logo?.url}
                fill
                alt={project.client.name}
                style={{ objectFit: "contain", objectPosition: "left" }}
              />
            )}
          </div>
          <div className="flex items-center gap-16">
            <div className="flex flex-col gap-4 items-end">
              <div
                className="flex gap-6"
                style={{ color: project.primaryColor?.hex }}
              >
                {project.tags?.map((tag) => (
                  <div
                    key={tag._id}
                    className="border px-4 py-1 rounded-full"
                    style={{ borderColor: project.primaryColor?.hex }}
                  >
                    {tag.name}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-row gap-4 font-mono uppercase">
              <div style={{ color: project.secondaryColor?.hex }}>Year</div>
              <div style={{ color: project.primaryColor?.hex }}>2021</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-20 max-w-[1600px] mx-12">
        {project.content?.map((content) => (
          <div key={content._key} className="grid grid-cols-12">
            {content._type === "imageBlock" && (
              <Section content={content}>
                <div className="rounded-xl overflow-hidden">
                  <Image
                    src={content.image?.url || ""}
                    width={content.image?.width}
                    height={content.image?.height}
                    alt={content.title || ""}
                  />
                </div>
              </Section>
            )}
            {content._type === "titleBlock" && (
              <Section content={content}>
                <div
                  className="inline-flex text-[30px] border-b pb-2"
                  style={{ borderColor: project.primaryColor?.hex }}
                >
                  {content.text}
                </div>
              </Section>
            )}
            {content._type === "paragraphBlock" && (
              <Section content={content}>
                {content.text && (
                  <PortableText value={content.text} components={components} />
                )}
              </Section>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
