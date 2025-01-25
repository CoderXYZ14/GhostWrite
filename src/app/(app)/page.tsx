import Navbar from "@/components/Navbar";
import { MessagePreview } from "@/components/MessagePreview";
import { Feature } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Lock, Shield, Zap, CheckCircle } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description: "Your messages are encrypted from sender to recipient.",
  },
  {
    icon: Shield,
    title: "Complete Anonymity",
    description:
      "We don't store any personal information. Your identity remains a mystery.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Our optimized infrastructure ensures instant message delivery.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col ">
      <main className="flex-grow">
        <section className="py-12 md:py-24 bg-background ">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
                    Send Anonymous Messages Securely
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Express yourself freely and safely. Ghost Writes provides a
                    platform for anonymous communication with top-notch
                    security.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signup">
                    <Button
                      size="lg"
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      Get Started
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button
                      size="lg"
                      variant="outline"
                      className="dark:bg-purple-600 dark:hover:bg-purple-700"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                    Secure
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                    Anonymous
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                    Fast
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <MessagePreview />
              </div>
            </div>
          </div>
        </section>
        <section className="py-16 md:py-24">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12">
              Our Features
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <Feature key={index} {...feature} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
