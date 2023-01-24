import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { muxInput } from "sanity-plugin-mux-input";
import { defineConfig } from "sanity";
import project from "./schemas/project";
import client from "./schemas/client";
import projectList from "./schemas/projectList";
import tag from "./schemas/tag";
import { colorInput } from "@sanity/color-input";
import { FiLayout, FiTag, FiUsers } from "react-icons/fi";
import { media } from "sanity-plugin-media";

export default defineConfig({
  basePath: "/studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "",
  title: process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || "Portfolio",
  schema: {
    types: [project, client, projectList, tag],
  },
  plugins: [
    deskTool({
      structure: (S) => {
        return S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Projects")
              .icon(FiLayout)
              .child(S.documentTypeList("project")),
            S.listItem()
              .title("Clients")
              .icon(FiUsers)
              .child(S.documentTypeList("client")),
            S.listItem()
              .title("Project List")
              .icon(FiLayout)
              .child(
                S.document().schemaType("projectList").documentId("projectList")
              ),
            S.listItem()
              .title("Tags")
              .icon(FiTag)
              .child(S.documentTypeList("tag")),
          ]);
      },
    }),
    visionTool(),
    muxInput({ mp4_support: "standard" }),
    colorInput(),
    media(),
  ],
});
