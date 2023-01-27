import { FiLayout } from "react-icons/fi";
import { defineField, defineType } from "sanity";

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
      name: "cover",
      title: "Cover",
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
        {
          type: "document",
          name: "imageBlock",
          title: "Image",
          fields: [
            {
              type: "image",
              name: "image",
              title: "Image",
            },
            {
              type: "string",
              name: "caption",
              title: "Caption",
            },
            {
              type: "number",
              name: "start",
              title: "Start",
              initialValue: 1,
            },
            {
              type: "number",
              name: "width",
              title: "Width",
              initialValue: 12,
            },
          ],
          preview: {
            select: {
              start: "start",
              width: "width",
              caption: "caption",
            },
            prepare({ start, width, caption }) {
              return {
                title: caption || "Image",
                subtitle: `Start: ${start}, Width: ${width}`,
              };
            },
          },
        },
        {
          type: "document",
          name: "videoBlock",
          title: "Video",
          fields: [
            {
              type: "mux.video",
              name: "video",
              title: "Video",
            },
            {
              type: "string",
              name: "caption",
              title: "Caption",
            },
            {
              type: "number",
              name: "start",
              title: "Start",
              initialValue: 1,
            },
            {
              type: "number",
              name: "width",
              title: "Width",
              initialValue: 12,
            },
          ],
          preview: {
            select: {
              start: "start",
              width: "width",
              caption: "caption",
            },
            prepare({ start, width, caption }) {
              return {
                title: caption || "Video",
                subtitle: `Start: ${start}, Width: ${width}`,
              };
            },
          },
        },
        {
          type: "document",
          name: "titleBlock",
          title: "Title",
          fields: [
            {
              type: "string",
              name: "text",
              title: "Text",
            },
            {
              type: "number",
              name: "start",
              title: "Start",
              initialValue: 1,
            },
            {
              type: "number",
              name: "width",
              title: "Width",
              initialValue: 12,
            },
          ],
          preview: {
            select: {
              text: "text",
              start: "start",
              width: "width",
            },
            prepare({ text, start, width }) {
              return {
                title: text,
                subtitle: `Start: ${start}, Width: ${width}`,
              };
            },
          },
        },
        {
          type: "document",
          name: "paragraphBlock",
          title: "Paragraph",
          fields: [
            {
              type: "array",
              name: "text",
              title: "Text",
              of: [{ type: "block" }],
            },
            {
              type: "number",
              name: "start",
              title: "Start",
              initialValue: 1,
            },
            {
              type: "number",
              name: "width",
              title: "Width",
              initialValue: 12,
            },
          ],
          preview: {
            select: {
              start: "start",
              width: "width",
            },
            prepare({ start, width }) {
              return {
                title: "Paragraph",
                subtitle: `Start: ${start}, Width: ${width}`,
              };
            },
          },
        },
      ],
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
    defineField({
      type: "image",
      name: "logo",
      title: "Client logo",
    }),
    defineField({
      type: "number",
      name: "logoWidth",
      title: "Logo Width",
      initialValue: 120,
    }),
    defineField({
      type: "number",
      name: "logoHeight",
      title: "Logo Height",
      initialValue: 40,
    }),
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
