import { FiList } from "react-icons/fi";
import { defineType } from "sanity";

export default defineType({
  name: "projectList",
  title: "Project List",
  icon: FiList,
  type: "document",
  fields: [
    {
      type: "string",
      name: "title",
      title: "Title",
      hidden: true,
    },
    {
      type: "array",
      name: "projects",
      title: "Projects",
      of: [{ type: "reference", to: [{ type: "project" }] }],
    },
  ],
});
