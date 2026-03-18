import localFont from "next/font/local";

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
    <html lang="ko">
      <head>
        <link rel="icon" href="/logo/favicon.svg" />
      </head>
      <body className={pretendard.className}>
        {children}
      </body>
    </html>
  );
}
