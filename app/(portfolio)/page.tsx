import { groq } from "next-sanity";
import { getClient } from "lib/sanity.server";
import { ProjectProps } from "types";
import { Cursor } from "components/cursor";
import { List } from "./components/list";
import { projectQuery } from "lib/queries";
import Footer from "./components/footer";
import { Biography } from "./components/biography";
import { ProjectIntro } from "./components/project-intro";
import { Intro } from "./components/intro";

async function getData() {
  const projects = await getClient().fetch(
    groq`*[_type == "projectList" && _id == "projectList"][0]{
      ...,
      projects[]->${projectQuery}
    }.projects`
  );
  return projects;
}

export default async function Page() {
  const data: ProjectProps[] = await getData();

  return (
    <>
      <Cursor />
      <ProjectIntro projects={data} />
      <div className="h-screen">
        <Intro />
      </div>
      <List data={data} />
      <Biography />
      <Footer />
    </>
  );
}
