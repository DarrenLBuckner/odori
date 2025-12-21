import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Odori - The Dance Industry Network",
  description: "Odori connects dance professionals with opportunities. Teachers find positions. Studios find talent. Launching January 2026.",
  openGraph: {
    title: "Odori - The Dance Industry Network",
    description: "The professional network built for dancers, choreographers, and studios. Launching January 2026.",
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
      <body>{children}</body>
    </html>
  );
}
