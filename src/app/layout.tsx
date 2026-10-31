import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#06080D" };

export const metadata: Metadata = {
  title: "Pooya Goodarzi | Pooya.OS — Interactive Engineering Portfolio",
  description:
    "Interactive engineering portfolio by Pooya Goodarzi, featuring responsive case studies, a browser-local desktop and design-system inspector.",
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
