import { groq } from "next-sanity";
import { getClient } from "../lib/sanity.server";

async function getData() {
  const projects = await getClient().fetch(groq`*[_type == "project"]`);
  return projects;
}

export default async function Home() {
  const data = await getData();
  console.log(data);
  return <div className="bg-red h-screen">Hello</div>;
}
