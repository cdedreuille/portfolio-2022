import { Inter } from "@next/font/google";
import localFont from "@next/font/local";
import "../styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  axes: ["slnt"],
});

const romie = localFont({
  src: "./fonts/RomieLigatures-Regular.woff2",
  variable: "--font-romie",
});

export default function MyApp({
  Component,
  pageProps,
}: {
  Component: any;
  pageProps: any;
}) {
  return (
    <main className={`${inter.variable} ${romie.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  );
}
