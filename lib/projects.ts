import type { ProjectProps } from "types";
import projectsData from "content/projects.json";

export const projects = projectsData as ProjectProps[];

export function getProjects(): ProjectProps[] {
  return projects;
}

export function getProjectBySlug(slug: string): ProjectProps | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}
