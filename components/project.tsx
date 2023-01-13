import classnames from "classnames";
import Image from "next/image";
import { FC } from "react";
import { ProjectProps } from "../types";

interface Props {
  project: ProjectProps;
}

export const Project: FC<Props> = ({ project }) => {
  console.log(project);

  return (
    <div
      className={classnames(
        "min-h-screen w-full p-8 sm:p-12 flex flex-col items-center gap-12",
        {
          "bg-cream": !project.backgroundColor,
          "text-black": !project.primaryColor,
        }
      )}
      style={{
        backgroundColor: project.backgroundColor?.hex,
        color: project.primaryColor?.hex,
      }}
    >
      <div className="max-w-[1600px] w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-row-6 gap-12">
          <div className="col-span-1">
            <div
              className="relative mb-12"
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
            <div className="text-2xl mb-12">{project.name}</div>
            <div className="flex items-center gap-8">
              <div
                className={classnames(
                  "border px-6 h-10 flex items-center rounded-full text-md transition-all duration-300 ease-in-out",
                  {
                    "border-black": !project.primaryColor,
                    "text-black": !project.primaryColor,
                  }
                )}
                style={{
                  borderColor: project.primaryColor?.hex,
                  color: project.primaryColor?.hex,
                }}
              >
                Product
              </div>
              <div className="">2021</div>
            </div>
          </div>
          <div
            className={classnames(
              "col-span-1 col-start-1 row-start-3 sm:row-start-2 max-w-2xl",
              {
                "text-black": !project.secondaryColor,
              }
            )}
            style={{
              color: project.secondaryColor?.hex,
            }}
          >
            {project.description}
          </div>
          <div className="col-span-1 sm:col-start-2 row-start-2 sm:row-start-1 sm:row-span-6 relative rounded-lg overflow-hidden h-64 sm:h-[600px]">
            {project.preview?.type === "image" &&
              project.preview.image?.url && (
                <Image
                  src={project.preview.image?.url}
                  fill
                  alt={project.client.name}
                  style={{ objectFit: "cover" }}
                />
              )}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-12 max-w-[1600px] w-full">
        {project.content?.map((content) => (
          <div key={content._key}>
            {content._type === "imageBlock" && content.image?.url && (
              <Image
                src={content.image?.url}
                width={content.image?.width}
                height={content.image?.height}
                alt={content.title || ""}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
