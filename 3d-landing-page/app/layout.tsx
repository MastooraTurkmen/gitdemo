import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "3D Landing Page",
  description: "3D Landing Page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
