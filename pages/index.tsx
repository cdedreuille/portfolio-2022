import { groq } from "next-sanity";
import { getClient } from "../lib/sanity.server";
import { ProjectProps } from "../types";
import { Cursor } from "../components2/cursor";
import { List } from "../components2/list";
import { IntroDesktop } from "../components2/intro-desktop";
import { Ellipse } from "../components2/ellipse";
import { MainHead } from "../components2/head";
import { useWindowSize } from "../hooks/useWindowSize";
import { IntroMobile } from "../components2/intro-mobile";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import { Project } from "components2/project";
import { AnimatePresence, motion } from "framer-motion";

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
      <div className="relative z-10">
        {width > 768 && <IntroDesktop />}
        {width <= 768 && <IntroMobile />}
        <List data={data} />
      </div>
      <footer className="h-[600px]"></footer>
      <Ellipse />
    </>
  );
}

export async function getStaticProps() {
  async function getData() {
    const projects = await getClient().fetch(
      groq`*[_type == "projectList" && _id == "projectList"][0]{
        ...,
        projects[]->{
          ...,
          "slug": slug.current,
          "tags": tags[]->{
            ...,
            "slug": slug.current
          },
          "client": client->{
            name,
            "image": image.asset->{
              "type": 'image',
              url,
              "width": metadata.dimensions.width,
              "height": metadata.dimensions.height
            }
          },
          "preview": preview{
            ...,
            "image": image.asset->{
              "type": 'image',
              url,
              "width": metadata.dimensions.width,
              "height": metadata.dimensions.height
            },
            "video": video.asset->{
              "type": 'mux',
              playbackId
            }
          },
          "content": content[]{
            ...,
            _type == 'image' => {
              _key,
              "type": 'image',
              "url": @.asset->url,
              "width": @.asset->metadata.dimensions.width,
              "height": @.asset->metadata.dimensions.height
            },
            _type == 'mux.video' => {
              _key,
              "type": 'mux',
              "playbackId": @.asset->playbackId
            },
          }
        }
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
