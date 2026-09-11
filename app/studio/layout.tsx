import type { Metadata } from "next";
import "./global.css";

export const metadata: Metadata = {
  title: "Portfolio Studio",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
