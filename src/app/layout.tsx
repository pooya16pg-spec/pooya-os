import type { Metadata } from "next";
// @ts-expect-error CSS import
import "./globals.css";

export const metadata: Metadata = {
  title: "Pooya Goodarzi | Pooya.OS — Full-Stack & UI/UX Engineer",
  description:
    "Interactive Spatial Portfolio of Pooya Goodarzi — Computer Engineer, Senior UI/UX Designer & Full-Stack Developer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Vazirmatn:wght@400;500;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'Vazirmatn', sans-serif" }}>{children}</body>
    </html>
  );
}