import { defineType } from "sanity";

export default defineType({
  name: "tag",
  title: "Tags",
  type: "document",
  fields: [
    {
      type: "string",
      name: "name",
      title: "Tag name",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Tag Slug",
      name: "slug",
      type: "slug",
      validation: (Rule) => Rule.required(),
    },
  ],
});
