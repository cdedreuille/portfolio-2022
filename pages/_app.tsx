import { Inter } from "@next/font/google";
import localFont from "@next/font/local";
import "../styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  axes: ["slnt"],
});

const romie = localFont({
  src: "./fonts/Romie-Regular.woff2",
  variable: "--font-romie",
});

const redaction = localFont({
  src: [
    {
      path: "./fonts/Redaction_35-Regular.woff2",
    },
    {
      path: "./fonts/Redaction_35-Italic.woff2",
      style: "italic",
    },
  ],
  variable: "--font-redaction",
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
      className={`${inter.variable} ${romie.variable}  ${redaction.variable} font-sans`}
    >
      <Component {...pageProps} />
    </main>
  );
}
