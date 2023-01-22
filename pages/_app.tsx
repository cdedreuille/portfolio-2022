import { IBM_Plex_Mono } from "@next/font/google";
import localFont from "@next/font/local";
import { GlobalProvider } from "components/global-provider";
import "../styles/globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-ibm-plex-mono",
});

const romie = localFont({
  src: "./fonts/RomieLigatures-Regular.woff2",
  variable: "--font-romie",
});

const union = localFont({
  src: [
    {
      path: "./fonts/Union-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Union-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-union",
});

export default function MyApp({
  Component,
  pageProps,
}: {
  Component: any;
  pageProps: any;
}) {
  return (
    <main
      className={`${romie.variable} ${ibmPlexMono.variable} ${union.variable} font-sans`}
    >
      <GlobalProvider>
        <Component {...pageProps} />
      </GlobalProvider>
    </main>
  );
}
