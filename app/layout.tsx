import type React from "react";
import "./globals.css";
import { Providers, themeScript } from "@/components/providers";

export const metadata = {
  generator: "v0.dev",
  title: "Discord Colored Text Generator",
  description: "Generate colored text for Discord using markdown code blocks",
};

export const viewport = {
  colorScheme: "light",
  themeColor: "white",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
