
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo/favicon.svg" />
      </head>
      <body>{children}</body>
    </html>
  );
}
