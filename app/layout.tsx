import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Josh Swid — Vancouver Tattoo Artist",
  description:
    "Josh Swid is a Vancouver-based tattoo artist specialising in fine line, sacred geometry, and classical realism. Currently guest artist at Zen Tattoo Studio, Oakville, ON.",
  keywords: [
    "tattoo artist",
    "Vancouver tattoo",
    "fine line tattoo",
    "sacred geometry",
    "classical realism",
    "Josh Swid",
    "Zen Tattoo Studio",
    "Oakville tattoo",
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
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
