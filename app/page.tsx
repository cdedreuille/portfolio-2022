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
    <div className="bg-red h-screen">
      {data.map((project) => (
        <div key={project._id}>{project.name}</div>
      ))}
    </div>
  );
}
