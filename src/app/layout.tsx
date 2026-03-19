import { ThemeSetter } from "@b1nd/dodam-design-system/next";
import localFont from "next/font/local";
import "./globals.css";
import { LoadingBar } from "@cher1shrxd/loading";
import { colors } from "@b1nd/dodam-design-system";

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
        <LoadingBar color={colors.brand.primary}/>
        {children}
      </body>
    </html>
  );
}
