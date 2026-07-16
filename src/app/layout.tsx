import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import "./globals.css";

// Display serif for headlines (exposed as the `font-display` utility).
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

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
    <html lang="en" className={fraunces.variable}>
      <body>{children}</body>
    </html>
  );
}
