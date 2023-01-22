import { groq } from "next-sanity";
import { getClient } from "../lib/sanity.server";
import { ProjectProps } from "../types";
import { Cursor } from "../components/cursor";
import { List } from "../components/list";
import { MainHead } from "../components/head";
import { useWindowSize } from "../hooks/useWindowSize";
import { Intro } from "../components/intro";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import { projectQuery } from "lib/queries";
import Footer from "components/footer";
import { Biography } from "components/biography";
import { ProjectIntro } from "components/project-intro";
import { Preview } from "components/preview";

export default function Portfolio({ projects }: { projects: ProjectProps[] }) {
  const { width, height } = useWindowSize();
  const router = useRouter();
  const [activeProject, setActiveProject] = useState<string | null>(null);

  useEffect(() => {
    if (!router.query.project) setActiveProject(null);
  }, [router.query.project]);

  if (!width) return null;

  const project = activeProject
    ? projects.find((p) => p.slug === activeProject)
    : null;

  return (
    <>
      <Cursor />
      <MainHead />
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

export async function getStaticProps() {
  async function getProjects() {
    const result = await getClient().fetch(
      groq`*[_type == "projectList" && _id == "projectList"][0]{
        ...,
        projects[]->${projectQuery}
      }.projects`
    );
    return result;
  }

  const projects: ProjectProps[] = await getProjects();

  return {
    props: {
      projects,
    },
  };
}
