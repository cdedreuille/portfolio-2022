import { deskTool } from "sanity/desk";
import { createConfig } from "sanity";
import project from "./schemas/project";
import client from "./schemas/client";

export default createConfig({
  basePath: "/admin",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "",
  title: process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || "Portfolio",
  schema: {
    types: [project, client],
  },
  plugins: [deskTool()],
});
