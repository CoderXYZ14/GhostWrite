import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`min-h-screen `}>
      <Navbar />
      <main className="container mx-auto px-4 py-8 ">{children}</main>
    </div>
  );
}
