"use client";

import { Analytics } from "@vercel/analytics/react";
import { GlobalProvider } from "components/global-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GlobalProvider>
      {children}
      <Analytics />
    </GlobalProvider>
  );
}
