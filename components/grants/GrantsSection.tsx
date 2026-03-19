"use client";

import { useState } from "react";
import { Badge } from "../shared/Badge";
import { GRANTS } from "../../lib/constants";
import { SectionHeader } from "../shared/SectionHeader";
import { GrantCard } from "./GrantCard";
import { cn } from "../../lib/utils";

const CATEGORIES = ["All", "India", "Global", "Seed Stage", "Growth Stage"];

export function GrantsSection() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredGrants = GRANTS.filter((g) => {
    if (activeTab === "All") return true;
    return g.tags.some(t => t.toLowerCase() === activeTab.toLowerCase());
  });

  return (
    <section id="grants" className="section-py relative overflow-hidden bg-white border-t border-[var(--bdA)]">
      <div className="section-max relative z-10">
        {/* Header */}
        <div className="mb-10 text-center">
          <SectionHeader
            eyebrow="Government Grants · Agritech & Biotech"
            title={<>Non-dilutive funding<br /><i className="text-[var(--gn)] heading-font tracking-tight font-black">available right now.</i></>}
            lead="Real government grants for Agritech and Biotech startups — India and global. ABVentures helps portfolio founders identify, prepare, and apply for grants that match their stage and sector."
            center
          />
        </div>

        {/* ABV Score Notice */}
        <div className="max-w-[800px] mx-auto bg-gradient-to-br from-[var(--gbg)] to-white border border-[var(--gbr)] rounded-2xl p-5 md:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-[var(--gn)] text-white flex items-center justify-center text-xl shrink-0 shadow-sm">
            🤖
          </div>
          <div className="text-[0.75rem] text-[var(--t2)] leading-relaxed">
            <strong className="text-[var(--tx)]">ABventures AI Lab prepares your grant applications.</strong> Once you score your idea above, our AI matches it to relevant grants, drafts your application narrative, and tracks submission deadlines — so founders spend zero time on paperwork.
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex justify-center mb-10 animate-fadein border-b border-[var(--bdA)] pb-2">
          <div className="flex gap-4 overflow-x-auto no-scrollbar max-w-full">
            {CATEGORIES.map((cat) => {
              const isActive = activeTab === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={cn(
                    "relative px-4 py-2 text-sm font-bold transition-all whitespace-nowrap",
                    isActive
                      ? "text-[var(--gn)]"
                      : "text-[var(--t3)] hover:text-[var(--tx)] hover:bg-slate-50/50 rounded-md"
                  )}
                >
                  {cat}
                  {isActive && (
                    <div className="absolute bottom-[-10px] left-0 right-0 h-[2px] bg-[var(--gn)] rounded-t-sm" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12 animate-fadein">
          {filteredGrants.map((grant) => (
            <GrantCard key={grant.id} grant={grant} />
          ))}
        </div>

        {/* ABV ASSIST STRIP */}
        <div className="bg-[var(--gbg)] border border-[var(--gbr)] rounded-2xl p-8 lg:p-10 mb-12 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="flex gap-5 items-start">
            <div className="w-12 h-12 rounded-xl bg-[var(--gn)] text-white flex items-center justify-center text-xl shrink-0 shadow-sm">
              🤖
            </div>
            <div>
              <div className="font-bold text-xl text-[var(--tx)] mb-2">ABventures AI Lab — Grant Application Support</div>
              <div className="text-xs text-[var(--t2)] leading-relaxed max-w-[560px]">
                ABVentures AI Lab identifies the right grants for your startup based on your idea score, stage, and sector — then drafts your application narrative, prepares the required documentation, and tracks every submission deadline. Portfolio founders get dedicated grant support from Day 1. Score your idea above to see which grants you're eligible for.
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0 w-full lg:w-auto">
            <a href="#idea-scorer" className="inline-flex items-center justify-center gap-2 bg-[var(--gn)] text-white font-bold text-sm px-6 py-3 rounded-xl transition-all  hover:-translate-y-0.5 shadow-sm">
              Score your idea first →
            </a>
            <a href="#" className="inline-flex items-center justify-center gap-2 bg-white text-[var(--tx)] border border-[var(--bdM)] font-bold text-sm px-6 py-3 rounded-xl transition-all hover:bg-slate-50 hover:border-[var(--tx)] shadow-sm">
              Apply for Batch 4 →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
