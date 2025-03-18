"use client";
import { Nosifer } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import NavButtons from "@/components/navButtons";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const nosifer = Nosifer({
  weight: "400", // Nosifer only comes in weight 400
  subsets: ["latin"],
});

export const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Check if we're on a dashboard page
  const isDashboardPage = pathname?.startsWith("/dashboard");

  // Handle scroll events to add background when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    if (!isDashboardPage) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isDashboardPage]);

  // Don't render navigation on dashboard pages
  if (isDashboardPage) {
    return null;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-md" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative w-10 h-10 overflow-hidden">
                <Image
                  src="/ghostvox-logo-transparent.png"
                  width={40}
                  height={40}
                  alt="Ghostvox Logo"
                  className="transition-transform hover:scale-110 duration-300"
                />
              </div>
              <div className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text">
                <h1 className={`${nosifer.className} text-transparent text-2xl`}>GHOSTVOX</h1>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavButtons />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${
            mobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          } md:hidden overflow-hidden transition-all duration-300 ease-in-out`}
        >
          <div className="pt-2 pb-4 space-y-1">
            <div className="py-2 flex flex-col items-center">
              <NavButtons />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
