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
      validation: (Rule) => Rule.required(),
    },
    {
      type: "reference",
      name: "client",
      title: "Reference to client",
      to: [{ type: "client" }],
      validation: (Rule) => Rule.required(),
    },
    {
      type: "string",
      name: "type",
      title: "Project Type",
      options: {
        list: [
          { title: "Product", value: "product" },
          { title: "Branding", value: "branding" },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      type: "date",
      name: "published_at",
      title: "Published Date",
      options: {
        dateFormat: "DD MMMM YYYY",
      },
      validation: (Rule) => Rule.required(),
    },
  ],
});
