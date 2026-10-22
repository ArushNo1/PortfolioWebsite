import type { Metadata } from "next";
import { Geist, Geist_Mono, IBM_Plex_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://arushbodla.org"),
  title: "Arush Bodla",
  description: "CS @ UMD · ACES Cyber · CTF player · Competitive programmer",
  icons: {
    icon: "/ArushBodlaWithoutBackground.svg",
  },
  openGraph: {
    title: "Arush Bodla",
    description: "CS @ UMD · ACES Cyber · CTF player · Competitive programmer",
    url: "https://arushbodla.org",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="generator" content="curiosity" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${plexMono.variable} antialiased`}>
        <div
          style={{ display: "none" }}
          dangerouslySetInnerHTML={{
            __html:
              "<!-- nice of you to check the source. challenge system is on the home page. /flag is the end. — AB -->",
          }}
        />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
