import { BookIcon, ImageIcon } from "@sanity/icons";
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
    {
      type: "array",
      name: "blocks",
      title: "blocks",
      of: [
        {
          type: "document",
          name: "asset",
          title: "Asset",
          icon: ImageIcon,
          fields: [
            {
              type: "array",
              name: "assets",
              title: "Assets",
              of: [
                {
                  type: "image",
                },
              ],
            },
          ],
          preview: {
            select: {
              assets: "assets",
            },
            prepare(selection) {
              const { assets } = selection;
              return {
                title:
                  assets && assets.length > 0
                    ? `${assets.length} media`
                    : "No image",
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
      };
    },
  },
});
