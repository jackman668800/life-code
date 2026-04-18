import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "生命代码 · LIFE CODE",
  description: "如果宇宙是写好的代码，你想不想知道你的生命代码是什么？",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  themeColor: "#050a05",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "生命代码" },
  openGraph: {
    title: "生命代码 · LIFE CODE",
    description: "如果宇宙是写好的代码，你想不想知道你的生命代码是什么？",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
