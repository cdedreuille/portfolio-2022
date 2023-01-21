"use client";

import classNames from "classnames";
import classnames from "classnames";
import Image from "next/image";
import { FC } from "react";
import { ProjectProps } from "types";
import { Button } from "./button";
import { useGlobal } from "./global-provider";

interface Props {
  project: ProjectProps;
}

export const Project: FC<Props> = ({ project }) => {
  const { activeProject, setActiveProject } = useGlobal();
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
      <div
        className="fixed bottom-12 right-12 z-30"
        onClick={() => setActiveProject(null)}
      >
        <Button>Close</Button>
      </div>
      <div className="flex flex-col w-screen h-screen px-12 pt-12 mb-24">
        <div className="flex-1 relative rounded-xl overflow-hidden">
          <div className="absolute bottom-14 left-14 z-20 text-titleXsPlus">
            {project.name}
          </div>
          <div className="absolute w-full h-40 z-10 left-0 bottom-0 bg-gradient-to-t from-black to-transparent" />
          {project.cover?.type === "image" && project.cover?.image?.url && (
            <Image
              src={project.cover.image.url}
              fill
              alt={project.client.name}
              style={{ objectFit: "cover" }}
            />
          )}
        </div>
        <div className="flex py-12 w-full">
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
          <div className="flex flex-col gap-4 w-40">
            <div style={{ color: project.secondaryColor?.hex }}>Year</div>
            <div style={{ color: project.primaryColor?.hex }}>2021</div>
          </div>
          <div className="flex flex-col gap-4">
            <div style={{ color: project.secondaryColor?.hex }}>Roles</div>
            <div
              className="flex gap-6"
              style={{ color: project.primaryColor?.hex }}
            >
              {project.tags?.map((tag) => (
                <div key={tag._id}>{tag.name}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-20 max-w-[1600px] mx-12">
        {project.content?.map((content) => (
          <div key={content._key} className="grid grid-cols-12">
            {content._type === "imageBlock" && content.image?.url && (
              <div
                className={classNames("rounded-xl overflow-hidden", {
                  "col-span-1": content.width === 1,
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
                <Image
                  src={content.image?.url}
                  width={content.image?.width}
                  height={content.image?.height}
                  alt={content.title || ""}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
