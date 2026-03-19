"use client";

import { useState } from "react";
import { SectionHeader } from "../shared/SectionHeader";
import { SystemMap } from "./SystemMap";
import { MarketingTab } from "./MarketingTab";
import { SalesTab } from "./SalesTab";
import { OpsTab } from "./OpsTab";
import type { AILabTab } from "../../lib/types";
import { cn } from "../../lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Megaphone, GraduationCap, Settings2, Sparkles } from "lucide-react";

const TABS: Array<{ key: AILabTab; label: string; icon: any; pip: string; badge: string }> = [
  { key: "mkt", label: "Marketing", icon: Megaphone, pip: "var(--gn)", badge: "8 Agents" },
  { key: "sales", label: "Sales", icon: GraduationCap, pip: "var(--bl)", badge: "Inbound" },
  { key: "ops", label: "Ops", icon: Settings2, pip: "var(--ea)", badge: "Automated" },
];

export function AILabSection() {
  const [activeTab, setActiveTab] = useState<AILabTab>("mkt");

  return (
    <div id="ai-lab-outer" className="border-t border-[var(--bd)] bg-white">
      <SystemMap />

      <section id="ai-lab" className="section-py relative overflow-hidden bg-white/50">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-lush opacity-10 blur-[120px] pointer-events-none" />

        <div className="section-max relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8 items-center justify-center">
            <div className="max-w-[800px]">
              <SectionHeader
                center
                eyebrow="ABventures AI Lab"
                title={<>Three automated systems. <span className="text-gn-gradient italic font-medium font-sans">One mission.</span></>}
                lead="Founders interact with the platform for under 10 minutes per week. Everything else — marketing, lead generation, ops, reporting — is running 24/7 without them."
              />
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="hidden xl:flex items-center gap-4 p-5 glass rounded-2xl border border-[var(--bdM)]"
            >
              <div className="w-10 h-10 rounded-xl bg-[var(--gn)]/10 flex items-center justify-center text-[var(--gn)]">
                <Sparkles size={20} />
              </div>
              <div>
                <p className="text-[0.95rem] font-bold text-[var(--tx)]">Lab Phase 2</p>
                <p className="text-[0.65rem] font-bold text-[var(--t3)] uppercase tracking-widest">Global Automation Pool</p>
              </div>
            </motion.div>
          </div>

          {/* Professional Tabs */}
          <div className="flex justify-center mb-10 border-b border-[var(--bdM)]">
            <div className="flex gap-4 md:gap-8 overflow-x-auto no-scrollbar max-w-full">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={cn(
                      "flex items-center gap-2 md:gap-3 py-3 md:py-4 text-[0.85rem] md:text-sm font-bold transition-all whitespace-nowrap relative min-w-[100px] md:min-w-[120px] justify-center px-2",
                      isActive
                        ? "text-[var(--gn)]"
                        : "text-[var(--t3)] hover:text-[var(--tx)] hover:bg-slate-50/50"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="lab-tab-indicator"
                        className="absolute bottom-0 left-0 right-0 h-[3px] bg-[var(--gn)] rounded-t-sm"
                        transition={{ type: "spring", bounce: 0.1, duration: 0.5 }}
                      />
                    )}
                    <Icon size={16} className={cn("relative z-10 shrink-0", isActive ? "text-[var(--gn)]" : "text-[var(--t3)]")} />
                    <span className="relative z-10">{tab.label}</span>
                    <span className={cn(
                      "relative z-10 hidden sm:inline-block px-1.5 py-0.5 rounded text-[0.6rem] md:text-[0.65rem] font-bold tracking-widest ml-1 uppercase",
                      isActive ? "bg-[var(--gn)]/10 text-[var(--gn)]" : "bg-[var(--bgA)] text-[var(--t3)]"
                    )}>
                      {tab.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                {activeTab === "mkt" && <MarketingTab onSwitchToSales={() => setActiveTab("sales")} />}
                {activeTab === "sales" && <SalesTab />}
                {activeTab === "ops" && <OpsTab />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
