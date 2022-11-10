import "./globals.css";
import { Inter } from "@next/font/google";
import localFont from "@next/font/local";
import { AnalyticsWrapper } from "./components/analytics";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const redaction = localFont({
  src: [
    { path: "./fonts/Redaction-Regular.woff2", weight: "100" },
    { path: "./fonts/Redaction_10-Regular.woff2", weight: "200" },
    { path: "./fonts/Redaction_20-Regular.woff2", weight: "300" },
    { path: "./fonts/Redaction_35-Regular.woff2", weight: "400" },
    { path: "./fonts/Redaction_50-Regular.woff2", weight: "500" },
    { path: "./fonts/Redaction_70-Regular.woff2", weight: "600" },
    { path: "./fonts/Redaction_100-Regular.woff2", weight: "700" },
  ],
  weight: "100 200 300 400 500 600 700",
  variable: "--font-redaction",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${redaction.variable}`}>
      <head>
        <title>Charles de Dreuille</title>
        <meta
          name="description"
          content="Charles de Dreuille is a digital product enthousiast from London — Connect design and engineering for humans of this world. For the past 12 years I had the chance to work for companies like Meta, Christian Louboutin, Deliveroo, Soho House and a handful of entrepreneurs delivering delightful experiences for their users."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="bg-black sm:bg-red cursor-none font-sans">
        {children}
        {process.env.NODE_ENV === "production" && <AnalyticsWrapper />}
      </body>
    </html>
  );
}
