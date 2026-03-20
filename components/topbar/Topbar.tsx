"use client";

import { useState } from "react";
import { Badge } from "../shared/Badge";
import { cn } from "../../lib/utils";
import { Leaf, Search, Globe, ChevronRight } from "lucide-react";
import { ApplyModal } from "../shared/ApplyModal";

const NAV_LINKS = [
  { label: "Idea Scorer", href: "#idea-scorer" },
  { label: "Grants", href: "#grants" },
  { label: "AI Lab", href: "#ai-lab" },
  { label: "DAO", href: "#dao-section" },
];

export function Topbar() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-[100] h-20 border-b border-[var(--bd)] px-[clamp(1.5rem,6vw,5rem)] flex items-center justify-between shadow-sm bg-white">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <p className="font-bold text-[1.2rem] tracking-tight leading-none text-green-800">
              AgriBioVentures
            </p>
          </div>
        </div>

        {/* Nav */}
        <nav className="hidden lg:flex items-center gap-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-6 py-2.5 text-[0.85rem] font-semibold text-[var(--t3)] hover:text-[var(--gn)] transition-all rounded-full hover:bg-[var(--gn-light)] flex items-center gap-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action */}
        <div className="flex items-center gap-6">
          <div className="hidden xl:flex items-center gap-2 opacity-60">
            <Globe size={14} />
            <span className="text-[0.7rem] font-bold uppercase tracking-widest">Global Batch 4</span>
          </div>

          <button
            onClick={() => setIsApplyModalOpen(true)}
            className="flex items-center gap-2 px-7 py-3 rounded-full bg-[var(--tx)] text-white text-[0.85rem] font-bold transition-all hover:bg-[var(--gn)] hover:scale-[1.02] active:scale-[0.98]"
          >
            Apply Now
            <ChevronRight size={16} />
          </button>
        </div>
      </header>

      {/* The Popup Modal */}
      <ApplyModal isOpen={isApplyModalOpen} onClose={() => setIsApplyModalOpen(false)} />
    </>
  );
}
