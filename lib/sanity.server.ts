import { createClient } from "next-sanity";
import { sanityConfig } from "./config";

export const getClient = () => createClient(sanityConfig);
