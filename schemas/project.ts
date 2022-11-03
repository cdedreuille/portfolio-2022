import { DocumentIcon, DocumentVideoIcon } from "@sanity/icons";
import { defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Projects",
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
    {
      type: "array",
      name: "blocks",
      title: "blocks",
      of: [
        {
          type: "document",
          name: "asset",
          title: "Asset",
          fields: [
            {
              type: "array",
              name: "assets",
              title: "Assets",
              of: [{ type: "image" }, { type: "mux.video" }],
            },
          ],
          preview: {
            select: {
              assets: "assets",
            },
            prepare(selection) {
              const { assets } = selection;
              const first = assets[0];

              const newTitle = () => {
                if (assets.length === 1 && first._type === "mux.video")
                  return "Single Video";
                if (assets.length === 1 && first._type === "image")
                  return "Single Image";
                if (assets.length === 2) return "Two Media";
                if (assets.length === 3) return "Three Media";
                return `${assets.length} Assets`;
              };

              return {
                title: newTitle(),
                media:
                  assets && assets.length > 0
                    ? first._type === "image"
                      ? assets[0]
                      : DocumentVideoIcon
                    : null,
              };
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      name: "name",
      client: "client.name",
    },
    prepare({ name, client }) {
      return {
        title: name,
        subtitle: client,
        media: DocumentIcon,
      };
    },
  },
});
