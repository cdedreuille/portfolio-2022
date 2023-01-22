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
import { Preview } from "./components/preview";

async function getProjects() {
  const result = await getClient().fetch(
    groq`*[_type == "projectList" && _id == "projectList"][0]{
      ...,
      projects[]->${projectQuery}
    }.projects`
  );
  return result;
}

export default async function Page() {
  const projects: ProjectProps[] = await getProjects();

  return (
    <>
      <Cursor />
      <ProjectIntro projects={projects} />
      <div className="h-screen">
        <Intro />
      </div>
      <Preview projects={projects} />
      <List data={projects} />
      <Biography />
      <Footer />
    </>
  );
}
