import { IBM_Plex_Mono } from "@next/font/google";
import localFont from "@next/font/local";
import { Cursor } from "components/cursor";
import { GlobalProvider, useGlobal } from "components/global-provider";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
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
        <Cursor />
        <AppWithProviders Component={Component} pageProps={pageProps} />
      </GlobalProvider>
    </main>
  );
}

const AppWithProviders = ({
  Component,
  pageProps,
}: {
  Component: any;
  pageProps: any;
}) => {
  const router = useRouter();

  const exit = () => {
    window.scrollTo(0, 0);
  };

  return (
    <AnimatePresence mode="wait" onExitComplete={exit} initial={false}>
      <Component {...pageProps} key={router.asPath} />
    </AnimatePresence>
  );
};
