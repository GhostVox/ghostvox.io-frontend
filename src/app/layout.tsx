import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/ui/navigation";
import { AuthCtxProvider } from "@/context/AuthContext";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GhostVox",
  description:
    "A platform where communties come to vote on a wide range of topics to get a general census of public discourse.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased m-0 w-screen h-screen overflow-y-scroll overflow-x-hidden  `}
      >
        <div className="flex w-full flex-col pt-20 ">
          <AuthCtxProvider>
            <Navigation />
            {children}
            <Footer />
          </AuthCtxProvider>
        </div>
      </body>
    </html>
  );
}
