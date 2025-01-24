export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900`}
      >
        {children}
      </body>
    </html>
  );
}
