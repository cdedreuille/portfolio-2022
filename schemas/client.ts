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
