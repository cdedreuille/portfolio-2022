import "./globals.css";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <title>Charles de Dreuille</title>
        <meta
          name="description"
          content="Charles de Dreuille is a digital product enthousiast from London — Connect design and engineering for humans of this world. For the past 12 years I had the chance to work for companies like Meta, Christian Louboutin, Deliveroo, Soho House and a handful of entrepreneurs delivering delightful experiences for their users."
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-black sm:bg-red">{children}</body>
    </html>
  );
}
