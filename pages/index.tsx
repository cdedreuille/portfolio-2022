import { groq } from "next-sanity";
import { getClient } from "../lib/sanity.server";
import { ProjectProps } from "../types";
import { Cursor } from "../components/cursor";
import { List } from "../components2/list";
import { IntroDesktop } from "../components2/intro-desktop";
import { Ellipse } from "../components2/ellipse";

export default function Portfolio({ data }: { data: ProjectProps[] }) {
  return (
    <>
      <Cursor />
      <div className="relative z-10">
        <IntroDesktop />
        <List data={data} />
      </div>
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
