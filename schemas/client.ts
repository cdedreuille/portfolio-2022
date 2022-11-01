import { UserIcon } from "@sanity/icons";
import { defineType } from "sanity";

export default defineType({
  name: "client",
  title: "Clients",
  icon: UserIcon,
  type: "document",
  fields: [
    {
      type: "string",
      name: "name",
      title: "Client name",
    },
  ],
});
