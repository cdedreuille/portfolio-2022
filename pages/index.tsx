import { ProjectProps } from "../types";
import { List } from "../components/list";
import { MainHead } from "../components/head";
import { useWindowSize } from "../hooks/useWindowSize";
import { Intro } from "../components/intro";
import Footer from "components/footer";
import { Biography } from "components/biography";
import { Preview } from "components/preview";
import { useEffect } from "react";
import { useGlobal } from "components/global-provider";
import Layout from "components/layout-home";
import { getProjects } from "lib/projects";

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
        <div className="md:min-h-screen">
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
  return {
    props: {
      projects: getProjects(),
    },
  };
}
