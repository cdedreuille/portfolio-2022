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
import { ProjectIntro } from "components/project-intro";
import { Preview } from "components/preview";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useGlobal } from "components/global-provider";

const variants = {
  visible: {},
  hidden: {},
};

export default function Portfolio({ projects }: { projects: ProjectProps[] }) {
  const { width } = useWindowSize();
  const { setActivePreview } = useGlobal();

  useEffect(() => {
    setActivePreview(null);
  }, [setActivePreview]);

  if (!width) return null;

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <MainHead />
      <ProjectIntro projects={projects} />
      <div className="h-screen">
        <Intro />
      </div>
      <Preview projects={projects} />
      <List data={projects} />
      <Biography />
      <Footer />
    </motion.div>
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
