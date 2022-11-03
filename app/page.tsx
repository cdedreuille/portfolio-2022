import { groq } from "next-sanity";
import { getClient } from "../lib/sanity.server";
import { ProjectProps } from "../types";
import { ProjectLine } from "./project-line";
import { Project } from "./project";
import { HomeDesktop } from "./home-desktop";
import { HomeMobile } from "./home-mobile";

async function getData() {
  const projects = await getClient().fetch(
    groq`*[_type == "project"]{..., "client": client->name}`
  );
  return projects;
}

export default async function Portfolio() {
  const data: ProjectProps[] = await getData();
  const half = Math.ceil(data.length / 2);
  const firstHalf = data.slice(0, half);
  const secondHalf = data.slice(half);

  return (
    <>
      <HomeDesktop />
      <HomeMobile />
      <div className="sm:bg-cream z-10 relative sm:top-[100vh] pt-24 pb-24">
        <div className="p-4 py-24 sm:p-12 sm:pb-48 bg-red sm:bg-cream">
          <div className="text-lg">Selected work over the years</div>
          <div className="w-40 h-px bg-black mt-4 mb-16 sm:mb-40" />
          <div className="flex sm:gap-16 flex-col sm:flex-row">
            <div className="flex-1">
              {firstHalf.map((project) => (
                <ProjectLine key={project._id} project={project} />
              ))}
            </div>
            <div className="flex-1">
              {secondHalf.map((project) => (
                <ProjectLine key={project._id} project={project} />
              ))}
            </div>
          </div>
        </div>
        <div className="p-4 pt-24 sm:p-12 bg-cream">
          {data.map((project) => (
            <Project key={project._id} project={project} />
          ))}
        </div>
      </div>
    </>
  );
}
