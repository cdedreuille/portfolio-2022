import { ThListIcon } from "@sanity/icons";
import { defineType } from "sanity";

export default defineType({
  name: "projectList",
  title: "Project List",
  icon: ThListIcon,
  type: "document",
  fields: [
    {
      type: "array",
      name: "projects",
      title: "Projects",
      of: [{ type: "reference", to: [{ type: "project" }] }],
    },
  ],
});
