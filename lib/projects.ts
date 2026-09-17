import type { ProjectProps } from "types";
import projectsData from "content/projects.json";

export const projects = projectsData as ProjectProps[];

export function getProjects(): ProjectProps[] {
  return projects;
}

// Safe to send to any visitor. Private projects are served only by the
// cookie-guarded route handler.
export function getPublicProjects(): ProjectProps[] {
  return projects.filter((project) => !project.private);
}

export function getPrivateProjectSlugs(): string[] {
  return projects.filter((project) => project.private).map((p) => p.slug);
}

export function getProjectBySlug(slug: string): ProjectProps | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}
