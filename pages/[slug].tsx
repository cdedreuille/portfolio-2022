import { groq } from "next-sanity";
import { getClient } from "lib/sanity.server";
import { ProjectProps } from "types";
import { FC, useEffect } from "react";
import { projectQuery } from "lib/queries";
import { motion } from "framer-motion";
import classNames from "classnames";
import { useRouter } from "next/router";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { Section } from "components/section";
import { Menu } from "components/menu";
import Layout from "components/layout-project";
import { useWindowSize } from "hooks/useWindowSize";
import MuxVideo from "@mux/mux-video-react";
import { MainHead } from "components/head";
import Head from "next/head";

interface Props {
  project: ProjectProps;
}

const wrapper = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <div className="text-lg md:text-titleStuff">{children}</div>
    ),
  },
};

const Project: FC<Props> = ({ project }) => {
  const router = useRouter();
  const { width } = useWindowSize();

  useEffect(() => {
    if (window) window.scrollTo(0, 0);
  }, [router]);

  return (
    <Layout project={project}>
      {/* <MainHead /> */}
      <Head>
        <title>
          {project.client.name} - {project.name}
        </title>
      </Head>
      <div
        className={classNames("min-h-screen w-full pb-48", {
          "bg-cream": !project.backgroundColor,
          "text-black": !project.primaryColor,
        })}
        style={{
          backgroundColor: project.backgroundColor?.hex,
          color: project.primaryColor?.hex,
        }}
      >
        <Menu />
        <motion.div
          variants={wrapper}
          transition={{ duration: 0.6 }}
          className={classNames("min-h-screen w-full", {
            "bg-cream": !project.backgroundColor,
            "text-black": !project.primaryColor,
          })}
          style={{
            backgroundColor: project.backgroundColor?.hex,
            color: project.primaryColor?.hex,
          }}
        >
          <div
            className={classNames("min-h-screen w-full", {
              "bg-cream": !project.backgroundColor,
              "text-black": !project.primaryColor,
            })}
            style={{
              backgroundColor: project.backgroundColor?.hex,
              color: project.primaryColor?.hex,
            }}
          >
            <div className="flex flex-col w-screen h-[520px] md:h-screen px-4 md:px-12 pt-4 md:pt-12 mb-12 md:mb-24">
              <div className="flex-1 relative rounded-xl overflow-hidden">
                {project.cover?.type === "image" &&
                  project.cover?.image?.url && (
                    <Image
                      src={project.cover.image.url}
                      fill
                      alt={project.client.name}
                      style={{ objectFit: "cover" }}
                    />
                  )}
                {project.cover?.type === "video" && project.cover?.video && (
                  <MuxVideo
                    playbackId={project.cover.video.playbackId}
                    muted
                    autoPlay
                    loop
                    controls={false}
                    playsInline
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                )}
              </div>
              <div className="flex py-12 w-full justify-between items-center">
                <div
                  className="relative mr-24"
                  style={{
                    width: project.logoWidth || 120,
                    height: project.logoHeight || 40,
                  }}
                >
                  {project.logo?.url && (
                    <Image
                      src={project.logo.url}
                      fill
                      alt={project.client.name}
                      style={{ objectFit: "contain", objectPosition: "left" }}
                    />
                  )}
                </div>
                {width && width > 768 && (
                  <div className="flex items-center gap-16">
                    <div className="flex flex-col gap-4 items-end">
                      <div
                        className="flex gap-6"
                        style={{ color: project.primaryColor?.hex }}
                      >
                        {project.tags?.map((tag) => (
                          <div
                            key={tag._id}
                            className="border px-4 py-1 rounded-full"
                            style={{ borderColor: project.primaryColor?.hex }}
                          >
                            {tag.name}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-row gap-4 font-mono uppercase">
                      <div style={{ color: project.secondaryColor?.hex }}>
                        Year
                      </div>
                      <div style={{ color: project.primaryColor?.hex }}>
                        2021
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-20 mx-4 md:mx-12">
              {project.content?.map((content) => (
                <div key={content._key} className="grid grid-cols-12">
                  {/* Image Block */}
                  {content._type === "imageBlock" && (
                    <Section content={content}>
                      <div className="rounded-xl overflow-hidden">
                        <Image
                          src={content.image?.url || ""}
                          width={content.image?.width}
                          height={content.image?.height}
                          alt={content.title || ""}
                        />
                      </div>
                    </Section>
                  )}

                  {/* Video Block */}
                  {content._type === "videoBlock" && (
                    <Section content={content}>
                      <div
                        className="rounded-xl overflow-hidden"
                        style={{
                          backgroundColor: project.backgroundColor?.hex,
                        }}
                      >
                        {content.video && (
                          <MuxVideo
                            playbackId={content.video.playbackId}
                            muted
                            autoPlay
                            loop
                            controls={content.controls || false}
                            playsInline
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              backgroundColor: project.backgroundColor?.hex,
                            }}
                          />
                        )}
                      </div>
                    </Section>
                  )}

                  {/* Title Block */}
                  {content._type === "titleBlock" && (
                    <Section content={content}>
                      <div
                        className="inline-flex text-lg md:text-titleStuff border-b pb-2"
                        style={{ borderColor: project.primaryColor?.hex }}
                      >
                        {content.text}
                      </div>
                    </Section>
                  )}

                  {/* Paragraph Block */}
                  {content._type === "paragraphBlock" && (
                    <Section content={content}>
                      <div className="flex flex-col gap-8">
                        {content.text && (
                          <PortableText
                            value={content.text}
                            components={components}
                          />
                        )}
                      </div>
                    </Section>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Project;

export async function getStaticProps(context: { params: { slug: any } }) {
  async function getData() {
    const projects = await getClient().fetch(
      groq`*[_type == "project" && slug.current == $slug][0]${projectQuery}`,
      { slug: context.params.slug }
    );
    return projects;
  }

  const project: ProjectProps[] = await getData();

  return {
    props: {
      project,
    },
  };
}

export async function getStaticPaths() {
  async function getData() {
    const projects = await getClient().fetch(
      groq`*[_type == "project"]{
        "slug": slug.current
      }`
    );
    return projects;
  }

  const data: ProjectProps[] = await getData();
  const listOfPath = data.map((project) => ({
    params: { slug: project.slug },
  }));

  return {
    paths: listOfPath,
    fallback: false, // can also be true or 'blocking'
  };
}
