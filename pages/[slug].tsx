import { groq } from "next-sanity";
import { getClient } from "../lib/sanity.server";
import { ProjectProps } from "../types";
import { Cursor } from "../components/cursor";
import { Project } from "../components/project";
import { FC } from "react";

interface Props {
  project: ProjectProps;
}

const Portfolio: FC<Props> = ({ project }) => {
  return (
    <div id="top">
      <Cursor />
      <Project
        project={project}
        isActive={true}
        projectActive={project._id}
        isHover={true}
        zIndex={1}
      />
    </div>
  );
};

export default Portfolio;

export async function getStaticProps(context: { params: { slug: any } }) {
  async function getData() {
    const projects = await getClient().fetch(
      groq`*[_type == "project" && slug.current == $slug][0]{
        ...,
        "slug": slug.current,
        "tags": tags[]->{
          ...,
          "slug": slug.current
        },
        "client": client->name,
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
        },
      }`,
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

  console.log(listOfPath);

  return {
    paths: listOfPath,
    fallback: false, // can also be true or 'blocking'
  };
}
