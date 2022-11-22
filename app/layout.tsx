import "./globals.css";
import { Inter } from "@next/font/google";
import { AnalyticsWrapper } from "./components/analytics";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  axes: ["slnt"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="bg-black sm:bg-red cursor-none font-sans">
        {children}
        {process.env.NODE_ENV === "production" && <AnalyticsWrapper />}
      </body>
    </html>
  );
}
