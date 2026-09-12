import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Providers } from "./providers";
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

const title = "Charles de Dreuille";
const description =
  "Product + Design + Engineering == 🖤 Connect design and engineering for humans of this world. Ex Meta, Christian Louboutin, Deliveroo, Soho House and a handful of entrepreneurs.";
const image = "https://charlesdedreuille.com/preview.jpg";

export const metadata: Metadata = {
  metadataBase: new URL("https://charlesdedreuille.com"),
  title,
  description,
  manifest: "/favicon/site.webmanifest",
  icons: {
    icon: [
      {
        url: "/favicon/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/favicon/apple-touch-icon.png",
        sizes: "180x180",
      },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/favicon/safari-pinned-tab.svg",
        color: "#5bbad5",
      },
    ],
  },
  openGraph: {
    title,
    description,
    images: [{ url: image, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    site: "@cdedreuille",
    images: [image],
  },
  other: {
    "msapplication-TileColor": "#da532c",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f5f7fb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main
          id="root"
          className={`${romie.variable} ${ibmPlexMono.variable} ${union.variable} font-sans`}
        >
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
