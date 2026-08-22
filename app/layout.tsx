import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Josh Swid — Vancouver Tattoo Artist",
  description:
    "Josh Swid is a Vancouver-based tattoo artist specialising in fine line, sacred geometry, and classical realism. Independent artist touring worldwide.",
  keywords: [
    "tattoo artist",
    "Vancouver tattoo",
    "fine line tattoo",
    "sacred geometry",
    "classical realism",
    "Josh Swid",
    "touring tattoo artist",
    "guest spot tattoo",
  ],
  openGraph: {
    title: "Josh Swid — Vancouver Tattoo Artist",
    description:
      "Fine line, sacred geometry, and classical realism. Custom designed. One of one.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
