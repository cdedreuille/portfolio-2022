import { BookIcon } from "@sanity/icons";
import { defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Projects",
  icon: BookIcon,
  type: "document",
  fields: [
    {
      type: "string",
      name: "name",
      title: "Project name",
    },
    {
      type: "reference",
      name: "client",
      title: "Reference to client",
      to: [{ type: "client" }],
    },
  ],
});
