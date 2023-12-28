import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL!),
  title: {
    default: "Missing Link",
    template: "%s | Missing Link",
  },
  description: "Proximity-based community alerts system",
  openGraph: {
    title: "Missing Link",
    description: "Proximity-based community alerts system",
    url: `${process.env.NEXT_PUBLIC_URL!}/`,
    siteName: "Missing Link",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_URL!}/og.png`, // Replace this with your own image
        width: 1920,
        height: 1080,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Missing Link",
    card: "summary_large_image",
  },
  icons: {
    shortcut: "/favicon.ico",
  },
  verification: {
    google: "VaD1qjKK95G1B1wsA3ZydoAdSg2r3aCm6D7ZJw2bw",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 overflow-y-auto">{children}</main>
            <footer className="sticky bottom-0 z-10">
              <div className="container mx-auto flex justify-center items-center">
                {/* <span className="text-primary/80">Code</span>
                <a
                  href="https://github.com/mkimbo/missing-link-site"
                  target="_blank"
                >
                  @mkimbo
                </a> */}
              </div>
            </footer>
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
