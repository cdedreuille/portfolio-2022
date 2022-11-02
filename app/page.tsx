import { groq } from "next-sanity";
import Image from "next/image";
import { getClient } from "../lib/sanity.server";
import { ProjectProps } from "../types";
import profilePic from "../public/charles.png";
import { Space } from "./space";
import { ProjectLine } from "./project-line";
import { Project } from "./project";

async function getData() {
  const projects = await getClient().fetch(
    groq`*[_type == "project"]{..., "client": client->name}`
  );
  return projects;
}

export default async function Home() {
  const data: ProjectProps[] = await getData();
  const half = Math.ceil(data.length / 2);
  const firstHalf = data.slice(0, half);
  const secondHalf = data.slice(half);

  console.log(data);

  return (
    <>
      <div className="bg-red h-screen fixed z-0 top-0 left-0 flex w-full">
        <div className="flex-1 p-12 flex flex-col justify-between">
          <div className="max-w-xl text-base font-medium">
            <span className="text-white">Charles de Dreuille</span> is a digital
            product enthousiast from London — Connect design and engineering for
            humans of this world. For the past 12 years I had the chance to work
            for companies like Meta, Christian Louboutin, Deliveroo, Soho House
            and a handful of entrepreneurs delivering delightful experiences for
            their users. Don&apos;t ask me why there are <Space /> in my resume.
            It&apos;s called life.
          </div>
          <div>
            <div className="text-xl mb-8">Want to work together?</div>
            <div className="flex gap-4">
              <button className="border border-black px-8 py-2 rounded-full text-base">
                Mail
              </button>
              <button className="border border-black px-8 py-2 rounded-full text-base">
                LinkedIn
              </button>
              <button className="border border-black px-8 py-2 rounded-full text-base">
                Instagram
              </button>
            </div>
          </div>
        </div>
        <div className="w-[50%] max-w-4xl bg-cream relative">
          <Image
            src={profilePic}
            alt="Charles de Dreuille"
            fill
            objectFit="cover"
          />
        </div>
      </div>
      <div className="bg-cream z-10 relative top-[100vh] pt-24 pb-24">
        <div className="p-12 mb-40">
          <div className="text-lg">Selected work over the years</div>
          <div className="w-40 h-px bg-black mt-4 mb-40" />
          <div className="flex gap-16">
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
        <div className="p-12">
          {data.map((project) => (
            <Project key={project._id} project={project} />
          ))}
        </div>
      </div>
    </>
  );
}
