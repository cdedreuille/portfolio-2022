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
import { Project } from "components/project";
import { AnimatePresence, motion } from "framer-motion";
import { projectQuery } from "lib/queries";
import Footer from "components/footer";
import { Biography } from "components/biography";

export default function Portfolio({ data }: { data: ProjectProps[] }) {
  const { width, height } = useWindowSize();
  const router = useRouter();
  const [activeProject, setActiveProject] = useState<string | null>(null);

  useEffect(() => {
    if (router.query.project) setActiveProject(router.query.project as string);
    else setActiveProject(null);
  }, [router.query.project]);

  if (!width) return null;

  const project = activeProject
    ? data.find((p) => p.slug === activeProject)
    : null;

  return (
    <>
      <Cursor />
      <MainHead />
      <AnimatePresence>
        {activeProject && project && (
          <motion.div
            initial={{ opacity: 1, y: height }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed top-0 left-0 right-0 bottom-0 z-[999] w-full overflow-scroll"
          >
            <Project project={project} />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative z-10 mb-16 md:mb-40">
        {width > 768 && <IntroDesktop />}
        {width <= 768 && <IntroMobile />}
        <List data={data} />
      </div>
      <Biography />
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
