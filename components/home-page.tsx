"use client";

import { ProjectProps } from "../types";
import { List } from "./list";
import { useWindowSize } from "../hooks/useWindowSize";
import { Intro } from "./intro";
import Footer from "components/footer";
import { Biography } from "components/biography";
import { Preview } from "components/preview";
import { useEffect } from "react";
import { useGlobal } from "components/global-provider";
import Layout from "components/layout-home";
import { useVisibleProjects } from "../hooks/useVisibleProjects";

export default function Portfolio({
  projects: publicProjects,
}: {
  projects: ProjectProps[];
}) {
  const { width } = useWindowSize();
  const { activePreview, setActivePreview } = useGlobal();
  const projects = useVisibleProjects(publicProjects);

  useEffect(() => {
    setActivePreview(null);
  }, [setActivePreview]);

  // Layout renders before the window size is known so its cover is part of the
  // first paint, which is what an incoming view transition animates.
  return (
    <>
      {width && (
        <Preview projects={projects} activePreview={activePreview} />
      )}
      <Layout>
        {width && (
          <>
            <div className="md:min-h-screen">
              <Intro />
            </div>
            <List projects={projects} />
            <Biography />
            <Footer />
          </>
        )}
      </Layout>
    </>
  );
}
