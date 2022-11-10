import { groq } from "next-sanity";
import { getClient } from "../lib/sanity.server";
import { ProjectProps } from "../types";
import { ProjectLine } from "./components/project-line";
import { Project } from "./components/project";
import { HomeDesktop } from "./components/home-desktop";
import { HomeMobile } from "./components/home-mobile";
import { Cursor } from "./components/cursor";

async function getData() {
  const projects = await getClient().fetch(
    groq`*[_type == "projectList" && _id == "projectList"][0]{
      ...,
      projects[]->{
        ...,
        "slug": slug.current,
        "client": client->name,
        "blocks": blocks[]{
          ...,
          "assets": assets[]{
            _type == 'image' => {
              _key,
              "type": 'image',
              "url": @.asset->url,
              "width": @.asset->metadata.dimensions.width,
              "height": @.asset->metadata.dimensions.height
            },
            _type == 'mux.video' => {
              _key,
              "type": 'mux',
              "playbackId": @.asset->playbackId
            },
          }
        }
      }
    }.projects`
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
      <Cursor />
      <HomeDesktop />
      <HomeMobile />
      <div className="sm:bg-cream z-50 absolute sm:top-[100vh] pt-24 pb-24">
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
