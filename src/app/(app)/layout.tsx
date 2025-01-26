import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-8 flex flex-col">
        {children}
      </main>
    </body>
  );
}
