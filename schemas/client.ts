import { UserIcon } from "@sanity/icons";
import { defineType } from "sanity";

export default defineType({
  name: "client",
  title: "Clients",
  type: "document",
  fields: [
    {
      type: "string",
      name: "name",
      title: "Client name",
    },
  ],
  preview: {
    select: {
      name: "name",
    },
    prepare({ name }) {
      return {
        title: name,
        media: UserIcon,
      };
    },
  },
});
