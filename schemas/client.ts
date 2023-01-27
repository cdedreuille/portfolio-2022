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
      name: "logoList",
      title: "Client logo List",
    }),
    defineField({
      type: "number",
      name: "logoWidthList",
      title: "Logo Width List",
      initialValue: 120,
    }),
    defineField({
      type: "number",
      name: "logoHeightList",
      title: "Logo Height List",
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
