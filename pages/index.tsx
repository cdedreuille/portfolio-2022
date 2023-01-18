import { groq } from "next-sanity";
import { getClient } from "../lib/sanity.server";
import { ProjectProps } from "../types";
import { Cursor } from "../components/cursor";
import { List } from "../components/list";
import { IntroDesktop } from "../components/intro-desktop";
import { MainHead } from "../components/head";
import { useWindowSize } from "../hooks/useWindowSize";
import { IntroMobile } from "../components/intro-mobile";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import { projectQuery } from "lib/queries";
import Footer from "components/footer";
import { Biography } from "components/biography";
import { ProjectIntro } from "components/project-intro";

export default function Portfolio({ data }: { data: ProjectProps[] }) {
  const { width, height } = useWindowSize();
  const router = useRouter();
  const [activeProject, setActiveProject] = useState<string | null>(null);

  useEffect(() => {
    if (!router.query.project) setActiveProject(null);
  }, [router.query.project]);

  if (!width) return null;

  const project = activeProject
    ? data.find((p) => p.slug === activeProject)
    : null;

  return (
    <>
      <Cursor />
      <MainHead />
      <ProjectIntro
        activeProject={activeProject}
        project={project}
        height={height}
      />
      <div className="relative z-10">
        {width > 768 && <IntroDesktop />}
        {width <= 768 && <IntroMobile />}
        <List data={data} setActiveProject={setActiveProject} />
      </div>
      {width > 768 && <Biography />}
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  async function getData() {
    const projects = await getClient().fetch(
      groq`*[_type == "projectList" && _id == "projectList"][0]{
        ...,
        projects[]->${projectQuery}
      }.projects`
    );
    return projects;
  }

  const data: ProjectProps[] = await getData();

  return {
    props: {
      data,
    },
  };
}
