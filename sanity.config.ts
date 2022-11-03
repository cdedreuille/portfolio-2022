import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { muxInput } from "sanity-plugin-mux-input";
import { createConfig } from "sanity";
import project from "./schemas/project";
import client from "./schemas/client";
import projectList from "./schemas/projectList";
import { UserIcon } from "@sanity/icons";

export default createConfig({
  basePath: "/admin",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "",
  title: process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || "Portfolio",
  schema: {
    types: [project, client, projectList],
  },
  plugins: [
    deskTool({
      structure: (S) => {
        return S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Projects")
              .child(S.documentTypeList("project").title("Projects")),
            S.listItem()
              .title("Clients")
              .icon(UserIcon)
              .child(S.documentTypeList("client").title("Clients")),
            S.listItem()
              .title("Project List")
              .child(
                S.document().schemaType("projectList").documentId("projectList")
              ),
          ]);
      },
    }),
    visionTool(),
    muxInput({ mp4_support: "standard" }),
  ],
});
