import { IBM_Plex_Mono, Inter } from "@next/font/google";
import localFont from "@next/font/local";
import { GlobalProvider } from "./components/global-provider";
import "./global.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  axes: ["slnt"],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-ibm-plex-mono",
});

const romie = localFont({
  src: "./fonts/RomieLigatures-Regular.woff2",
  variable: "--font-romie",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${romie.variable} ${ibmPlexMono.variable} font-sans`}
      >
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  );
}
