import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.scss";

const manropeCyrillic = localFont({
  src: "./fonts/manrope-cyrillic.woff2",
  weight: "200 800",
  variable: "--font-manrope-cyrillic",
  display: "swap",
});

const manropeLatin = localFont({
  src: "./fonts/manrope-latin.woff2",
  weight: "200 800",
  variable: "--font-manrope-latin",
  display: "swap",
});

const unboundedCyrillic = localFont({
  src: "./fonts/unbounded-cyrillic.woff2",
  weight: "200 900",
  variable: "--font-unbounded-cyrillic",
  display: "swap",
});

const unboundedLatin = localFont({
  src: "./fonts/unbounded-latin.woff2",
  weight: "200 900",
  variable: "--font-unbounded-latin",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TourTap",
  description: "Из вашего поста — в новое приключение.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${manropeCyrillic.variable} ${manropeLatin.variable} ${unboundedCyrillic.variable} ${unboundedLatin.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
