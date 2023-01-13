import { DocumentVideoIcon } from "@sanity/icons";
import { FiLayout } from "react-icons/fi";
import { defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Projects",
  type: "document",
  icon: FiLayout,
  fields: [
    {
      type: "string",
      name: "name",
      title: "Project name",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Project Slug",
      name: "slug",
      type: "slug",
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
      title: "Project Type (DEPRECATED)",
      options: {
        list: [
          { title: "Product", value: "product" },
          { title: "Branding", value: "branding" },
          { title: "Marketing", value: "marketing" },
          { title: "Experiment", value: "experiment" },
          { title: "Production", value: "production" },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tag" }] }],
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
      name: "preview",
      title: "Preview",
      type: "document",
      fields: [
        {
          type: "string",
          name: "type",
          title: "Type",
          initialValue: "image",
          options: {
            list: [
              { title: "Image", value: "image" },
              { title: "Video", value: "video" },
            ],
          },
        },
        {
          type: "image",
          name: "image",
          title: "Image",
          hidden: ({ parent }) => parent?.type !== "image",
        },
        {
          type: "mux.video",
          name: "video",
          title: "Video",
          hidden: ({ parent }) => parent?.type !== "video",
        },
      ],
    },
    {
      type: "array",
      name: "content",
      title: "Content",
      of: [
        { type: "image" },
        { type: "mux.video" },
        {
          type: "document",
          name: "imageBlock",
          title: "Image Block",
          fields: [
            {
              type: "string",
              name: "title",
              title: "Title",
              initialValue: "Image",
            },
            {
              type: "image",
              name: "image",
              title: "Image",
            },
          ],
        },
      ],
    },
    {
      type: "array",
      name: "blocks",
      title: "Blocks (DEPRECATED)",
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
    {
      type: "string",
      name: "description",
      title: "Description",
    },
    {
      type: "color",
      name: "backgroundColor",
      title: "Background Color",
    },
    {
      type: "color",
      name: "primaryColor",
      title: "Primary Color",
    },
    {
      type: "color",
      name: "secondaryColor",
      title: "Secondary Color",
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
