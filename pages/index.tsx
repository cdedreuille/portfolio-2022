import { groq } from "next-sanity";
import { getClient } from "../lib/sanity.server";
import { ProjectProps } from "../types";
import { List } from "../components/list";
import { MainHead } from "../components/head";
import { useWindowSize } from "../hooks/useWindowSize";
import { Intro } from "../components/intro";
import { projectQuery } from "lib/queries";
import Footer from "components/footer";
import { Biography } from "components/biography";
import { Preview } from "components/preview";
import { useEffect } from "react";
import { useGlobal } from "components/global-provider";
import Layout from "components/layout-home";

export default function Portfolio({ projects }: { projects: ProjectProps[] }) {
  const { width } = useWindowSize();
  const { activePreview, setActivePreview } = useGlobal();

  useEffect(() => {
    setActivePreview(null);
  }, [setActivePreview]);

  if (!width) return null;

  return (
    <>
      <Preview projects={projects} activePreview={activePreview} />
      <Layout>
        <MainHead />
        <div className="h-screen">
          <Intro />
        </div>

        <List projects={projects} />
        <Biography />
        <Footer />
      </Layout>
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
