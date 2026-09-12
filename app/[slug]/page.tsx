import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DirectionalTransition } from "components/directional-transition";
import Project from "components/project-page";
import { getProjectBySlug, getProjectSlugs } from "lib/projects";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return {
    title: `${project.client.name} - ${project.name}`,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Keyed on the slug so project-to-project navigation remounts the segment
  // instead of updating in place, which replays the cover intro animation.
  return (
    <DirectionalTransition key={slug}>
      <Project project={project} />
    </DirectionalTransition>
  );
}
