export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <p>Root layout</p>
        {children}
      </body>
    </html>
  );
}
