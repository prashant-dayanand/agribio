"use client";

import { useState } from "react";
import { Globe, ChevronRight, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

const NAV_LINKS = [
  { label: "Idea Scorer", href: "/ideascorer" },
  { label: "Grants", href: "/grants" },
  { label: "AI Lab", href: "/ai-labs" },
  { label: "DAO", href: "/dao" },
];

export function Topbar() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-[100] h-20 border-b border-[var(--bd)] px-4 sm:px-6 lg:px-[clamp(1.5rem,6vw,5rem)] flex items-center justify-between shadow-sm bg-white">
        {/* Left Section: Mobile Menu Toggle & Logo */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 -ml-2 text-gray-700 hover:text-green-800 transition-colors focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <div className="cursor-pointer" onClick={() => router.push("/")}>
            <p className="font-bold text-[1.1rem] sm:text-[1.2rem] tracking-tight leading-none text-green-800">
              AgriBioVentures
            </p>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-2">
          {NAV_LINKS.map((link) => (
            <span
              key={link.label}
              onClick={() => router.push(link.href)}
              className="px-6 cursor-pointer py-2.5 text-[0.85rem] font-semibold text-[var(--t3)] hover:text-[var(--gn)] transition-all rounded-full hover:bg-[var(--gn-light)] flex items-center gap-1"
            >
              {link.label}
            </span>
          ))}
        </nav>

        {/* Action */}
        <div className="flex items-center gap-3 sm:gap-6">
          <div className="hidden xl:flex items-center gap-2 opacity-60">
            <Globe size={14} />
            <span className="text-[0.7rem] font-bold uppercase tracking-widest">Global Batch 4</span>
          </div>

          <button
            onClick={() => router.push("/apply")}
            className="flex items-center cursor-pointer gap-1 sm:gap-2 px-4 sm:px-7 py-2 sm:py-3 rounded-full bg-[var(--tx)] text-white text-[0.8rem] sm:text-[0.85rem] font-bold transition-all hover:bg-[var(--gn)] hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Apply<span className="hidden sm:inline"> Now</span></span>
            <ChevronRight size={16} className="hidden sm:block" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed top-20 left-0 w-full bg-white border-b border-[var(--bd)] shadow-lg z-[90] flex flex-col py-4 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col w-full">
            {NAV_LINKS.map((link) => (
              <span
                key={link.label}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  router.push(link.href);
                }}
                className="w-full px-8 py-4 text-[1rem] font-semibold text-[var(--t3)] hover:text-[var(--gn)] transition-all hover:bg-gray-50 active:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-none"
              >
                {link.label}
              </span>
            ))}
          </nav>
          <div className="flex items-center justify-center gap-2 opacity-60 mt-4 py-4 bg-gray-50">
            <Globe size={14} />
            <span className="text-[0.75rem] font-bold uppercase tracking-widest">Global Batch 4</span>
          </div>
        </div>
      )}
    </>
  );
}
