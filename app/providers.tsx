"use client";

import { Analytics } from "@vercel/analytics/react";
import { Cursor } from "components/cursor";
import { GlobalProvider } from "components/global-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GlobalProvider>
      <Cursor />
      {children}
      <Analytics />
    </GlobalProvider>
  );
}
