"use client";

import { Badge } from "../shared/Badge";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";
import { Microscope, Beaker, ShieldCheck, Zap, BarChart3, Rocket, ArrowRight } from "lucide-react";

const PROMISE_LEFT = [
  { icon: "🌾", title: "Agritech R&D", desc: "crop genomics, precision farming, sensor technology, yield intelligence" },
  { icon: "🧬", title: "Biotech research", desc: "clinical trials, lab validation, bioinformatics, regulatory science" },
  { icon: "📡", title: "IP development", desc: "patents, publications, scientific credibility, deep tech moat" },
];

const PROMISE_RIGHT = [
  { icon: "📣", title: "Marketing", desc: "8 AI agents, 100+ pages, AI citations, backlinks, brand in ChatGPT/Gemini/Claude" },
  { icon: "📊", title: "Sales", desc: "inbound lead generation, intent scoring, spam filtering, pipeline management" },
  { icon: "⚙️", title: "Ops", desc: "OKR tracking, investor reports, on-chain impact logging, weekly dashboards" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-20 bg-white border-b border-[var(--bd)]">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-lush opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--gn)]/5 blur-[100px] rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none" />

      <div className="relative z-10 section-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">

          {/* Main Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="green" dot className="bg-[var(--gbg)] text-[var(--gn)] border-[var(--gbr)] shadow-none">ABventures AI Lab</Badge>
              <Badge variant="default">Marketing · Sales · Ops</Badge>
            </div>

            <h1 className="text-4xl font-black tracking-tight leading-[1.1] mb-5 text-[var(--tx)]">
              You build the <i className="text-[var(--gn)] heading-font tracking-tight font-black">science.</i><br />
              We handle <i className="text-[var(--ea)] heading-font tracking-tight font-black">everything</i><br />
              <i className="text-[var(--gn)] heading-font tracking-tight font-black">else.</i>
            </h1>

            <p className="text-sm text-[var(--t2)] leading-relaxed font-normal mb-8 max-w-4xl">
              AgriBioVentures funds Agritech and Biotech startups and immediately activates the <strong>ABventures AI Lab</strong> — a full marketing, sales, and operations system — on Day 1. A decentralised funding DAO handles governance and on-chain rewards for eligible startups. Founders stay in the lab. Completely.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[var(--gn)] text-white text-base font-bold transition-all hover:bg-[var(--g2)] hover:-translate-y-0.5 shadow-sm hover:shadow-lg hover:shadow-[var(--gn)]/20">
                Apply to Batch 4 →
              </button>
            </div>
          </motion.div>

          {/* Promise Grid - Standardized Flat Cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full"
          >
            {/* Left: Founder Focus */}
            <div className="bg-white border border-[var(--bdA)] rounded-2xl p-5 sm:p-6 transition-colors duration-300 hover:border-[var(--gn)] hover:bg-slate-50/50 flex flex-col h-full relative group">
              <div className="mb-5">
                <div className="text-[var(--t3)] text-sm font-bold mb-3 flex items-center gap-2">
                  <span className="text-base">🔬</span> Founders — focus here
                </div>
              </div>

              <div className="space-y-3 flex-1">
                {PROMISE_LEFT.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[var(--gn)]/10 text-[var(--gn)] flex items-center justify-center text-sm shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-[0.85rem] font-bold text-[var(--tx)]">{item.title}</h4>
                      <p className="text-[0.65rem] text-[var(--t2)] leading-relaxed mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-5 border-t border-[var(--bdM)]">
                <Badge variant="green" className="bg-[var(--gn)]/10 text-[var(--gn)] border-[var(--gn)]/20 shadow-none font-bold text-[0.65rem] py-1 px-2">✓ Your entire job description</Badge>
              </div>
            </div>

            {/* Right: AI Lab Automation */}
            <div className="bg-[var(--gbg)] border border-[var(--gbr)] rounded-2xl p-5 sm:p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-[var(--gn)]/40 flex flex-col h-full relative group">
              <div className="mb-5">
                <div className="text-[var(--gn)] text-sm font-bold mb-3 flex items-center gap-2">
                  <span className="text-base">🤖</span> AI Lab — handles this
                </div>
              </div>

              <div className="space-y-3 flex-1">
                {PROMISE_RIGHT.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[var(--gn)]/10 text-[var(--gn)] flex items-center justify-center text-sm shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-[0.85rem] font-bold text-[var(--tx)]">{item.title}</h4>
                      <p className="text-[0.65rem] text-[var(--t2)] leading-relaxed mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-5 border-t border-[var(--gbr)]">
                <Badge variant="green" className="bg-white text-[var(--gn)] border-[var(--gbr)] shadow-sm font-bold text-[0.65rem] py-1 px-2">✓ Zero founder hours</Badge>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
