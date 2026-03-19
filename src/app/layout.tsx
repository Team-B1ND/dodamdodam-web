import { ThemeSetter } from "@b1nd/dodam-design-system/next";
import localFont from "next/font/local";
import "./globals.css";

const pretendard = localFont({
  src: "../../public/font/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo/favicon.svg" />
        <ThemeSetter />
      </head>
      <body className={`w-full h-screen ${pretendard.className}`}>
        {children}
      </body>
    </html>
  );
}
