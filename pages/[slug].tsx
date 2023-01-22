import { groq } from "next-sanity";
import { getClient } from "lib/sanity.server";
import { ProjectProps } from "types";
import { Project } from "components/project";
import { FC } from "react";
import { projectQuery } from "lib/queries";
import { motion } from "framer-motion";
import classNames from "classnames";

interface Props {
  project: ProjectProps;
}

const variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 1 },
};

const variant2 = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const Portfolio: FC<Props> = ({ project }) => {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className={classNames("min-h-screen w-full pb-48", {
        "bg-cream": !project.backgroundColor,
        "text-black": !project.primaryColor,
      })}
      style={{
        backgroundColor: project.backgroundColor?.hex,
        color: project.primaryColor?.hex,
      }}
    >
      <motion.div
        variants={variant2}
        transition={{ duration: 2 }}
        className={classNames("min-h-screen w-full pb-48", {
          "bg-cream": !project.backgroundColor,
          "text-black": !project.primaryColor,
        })}
        style={{
          backgroundColor: project.backgroundColor?.hex,
          color: project.primaryColor?.hex,
        }}
      >
        <Project project={project} />
      </motion.div>
    </motion.div>
  );
};

export default Portfolio;

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
      groq`*[_type == "projectList" && _id == "projectList"][0]{
        ...,
        projects[]->{
          ...,
          "slug": slug.current
        }
      }.projects`
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
