import { groq } from "next-sanity";
import { getClient } from "../lib/sanity.server";
import { ProjectProps } from "../types";

async function getData() {
  const projects = await getClient().fetch(groq`*[_type == "project"]`);
  return projects;
}

export default async function Home() {
  const data: ProjectProps[] = await getData();

  return (
    <>
      <div className="bg-red h-screen">
        <div className="">
          Charles de Dreuille is a digital product enthousiast from London —
          Connect design and engineering for humans of this world. For the past
          12 years I had the chance to work for companies like Meta, Christian
          Louboutin, Deliveroo, Soho House and a handful of entrepreneurs
          delivering delightful experiences for their users. Don&apos;t ask me
          why there are in my resume. It&apos;s called life.
        </div>
      </div>
      <div className="bg-cream h-screen">
        {data.map((project) => (
          <div key={project._id}>{project.name}</div>
        ))}
      </div>
    </>
  );
}
