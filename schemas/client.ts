import { FiUser } from "react-icons/fi";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "client",
  title: "Clients",
  type: "document",
  icon: FiUser,
  fields: [
    defineField({
      type: "string",
      name: "name",
      title: "Client name",
    }),
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
    },
    prepare({ name }) {
      return {
        title: name,
      };
    },
  },
});
