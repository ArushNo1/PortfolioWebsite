import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arush Bodla",
  description: "CS @ UMD · ACES Cyber · CTF player · Competitive programmer",
  icons: {
    icon: "/ArushBodlaWithoutBackground.svg",
  },
  openGraph: {
    title: "Arush Bodla",
    description: "CS @ UMD · ACES Cyber · CTF player · Competitive programmer",
    url: "https://arushbodla.vercel.app",
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div
          style={{ display: "none" }}
          dangerouslySetInnerHTML={{
            __html:
              "<!-- nice of you to check the source. challenge system is on the home page. /flag is the end. — AB -->",
          }}
        />
        {children}
      </body>
    </html>
  );
}
