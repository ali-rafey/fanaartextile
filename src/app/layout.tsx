import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Fanaar — Premium Lounge Fabrics",
    template: "%s · Fanaar",
  },
  description:
    "Fanaar — premium lounge and loungewear fabrics, crafted for comfort.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
