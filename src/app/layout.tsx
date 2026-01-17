import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Odori - The Dance Industry Network",
  description: "Odori connects dance professionals with opportunities. Teachers find positions. Studios find talent.",
  openGraph: {
    title: "Odori - The Dance Industry Network",
    description: "The professional network built for dancers, choreographers, and studios.",
    type: "website",
    url: "https://odori.io",
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
        <link rel="icon" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
      </head>
      <body>{children}</body>
    </html>
  );
}
