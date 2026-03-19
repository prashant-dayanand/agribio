"use client";

import { Badge } from "../shared/Badge";
import { Ticker } from "../shared/Ticker";
import { AGENTS } from "../../lib/constants";
import type { Agent } from "../../lib/types";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";
import {
  CheckCircle2, Globe, Search, MessageSquare,
  Share2, BarChart, Sparkles, ArrowRight, Zap,
  Cpu, Target, Database, TrendingUp
} from "lucide-react";

const ICON_MAP: Record<string, any> = {
  "🌍": <Globe size={18} />,
  "🔍": <Search size={18} />,
  "📝": <MessageSquare size={18} />,
  "🔗": <Share2 size={18} />,
  "📈": <BarChart size={18} />,
  "⚙️": <Cpu size={18} />,
  "🎯": <Target size={18} />,
  "📊": <Database size={18} />,
};

function AgentCard({ agent }: { agent: Agent }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white border border-[var(--bdM)] rounded-2xl p-6 flex flex-col h-full shadow-sm hover:shadow-md hover:border-[var(--gn)] transition-all duration-300 group"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="w-10 h-10 rounded-xl bg-[var(--bgA)] border border-[var(--bdM)] flex items-center justify-center text-[var(--gn)] group-hover:bg-[var(--gn)] group-hover:text-white transition-colors duration-300 shadow-sm">
          {ICON_MAP[agent.icon] || agent.icon}
        </div>

      </div>

      <h4 className="text-lg font-bold text-[var(--tx)] mb-2 tracking-tight group-hover:text-[var(--gn)] transition-colors">{agent.name}</h4>
      <p className="text-sm text-[var(--t2)] leading-relaxed mb-8 flex-1 font-medium italic opacity-80">
        {agent.description}
      </p>

      <div className="flex items-center gap-2 pt-4 border-t border-[var(--bdM)] opacity-50">
        <span className="text-[0.65rem] font-bold uppercase tracking-widest font-mono">ID: 00{agent.number}</span>
      </div>
    </motion.div>
  );
}

interface MarketingTabProps {
  onSwitchToSales: () => void;
}

export function MarketingTab({ onSwitchToSales }: MarketingTabProps) {
  return (
    <div className="space-y-16">
      {/* Intro */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr,380px] gap-16 items-start">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <Badge variant="green" dot className="uppercase tracking-widest shadow-sm">Search Dominance</Badge>
            <span className="text-xs font-bold text-[var(--t3)] uppercase tracking-widest italic font-sans">LLM Ingestion Ready</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--tx)] leading-[1.1] tracking-tight mb-8">
            Your startup cited by <span className="text-gn-gradient italic font-medium font-sans">ChatGPT, Gemini & Claude</span> from Day 1.
          </h2>
          <p className="text-sm text-[var(--t2)] leading-relaxed font-medium">
            ABventures AI Lab builds a living context feed on your website — so when qualified buyers search for a Bio-AI solution, your startup is the only answer every model gives.
          </p>
        </div>

        {/* Highlight Stats - Premium Cards */}
        <div className="space-y-4">
          {[
            { val: "100+", title: "Pages live in 90 days", sub: "Content optimized for LLMs." },
            { val: "5-10", title: "Qualified leads/mo", sub: "Intent-scored and attributed." },
            { val: "Day 0", title: "Instant Activation", sub: "Agents run automatically." },
          ].map((s, idx) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white border border-[var(--bdA)] rounded-xl p-6 transition-all hover:bg-slate-50 border-l-4 border-l-[var(--gn)] shadow-sm"
            >
              <div className="flex items-center gap-6">
                <span className="text-3xl font-bold text-gradient tracking-tight leading-none shrink-0 w-30">
                  {s.val}
                </span>
                <div>
                  <p className="font-bold text-sm text-[var(--tx)] mb-1 leading-none tracking-tight">{s.title}</p>
                  <p className="text-xs text-[var(--t3)] font-medium leading-tight">{s.sub}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Ticker Section - High Contrast */}
      <div className="bg-[var(--tx)] rounded-2xl px-8 py-6 flex items-center justify-between overflow-hidden relative group shadow-md">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--gn)]/5 to-transparent" />
        <div className="flex items-center gap-3 whitespace-nowrap animate-marquee relative z-10">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex items-center gap-3">
              <div className="flex items-center gap-3">
                <Zap size={16} className="text-[var(--gn)]" />
                <span className="text-white text-xs font-bold uppercase tracking-widest font-mono">Organic Reach: +412% AVG</span>
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
              <div className="flex items-center gap-3">
                <TrendingUp size={16} className="text-[var(--gn)]" />
                <span className="text-white text-xs font-bold uppercase tracking-widest font-mono">Top 3 for 'Bio-Polymer AI'</span>
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
            </div>
          ))}
        </div>
      </div>

      {/* Agents Grid */}
      <div>
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--bdM)]">
          <div>
            <h4 className="text-[0.7rem] font-bold uppercase tracking-widest text-[var(--t3)]">Agent Workforce</h4>
            <p className="text-lg font-bold text-[var(--tx)] mt-1">Specialized Bio-Growth Clusters</p>
          </div>
          <Badge variant="green" dot className="bg-[var(--gn)]/5 text-[var(--gn)] border-[var(--gn)]/20 px-4 py-1.5 text-xs shadow-sm">Auto-Scaling Live</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {AGENTS.map((agent) => (
            <AgentCard key={agent.number} agent={agent} />
          ))}
        </div>
      </div>

      {/* Footer CTA - High Impact */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="bg-lush rounded-3xl p-10 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-12 border border-[var(--bdM)] relative overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[var(--gn)]/5 blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="max-w-2xl text-center md:text-left relative z-10">
          <Badge variant="green" dot className="bg-white border-white/50 mb-6 shadow-sm">Long-term Alpha</Badge>
          <h4 className="text-3xl md:text-4xl font-bold text-[var(--tx)] mb-6 leading-tight tracking-tight">The longer it runs, the stronger it gets.</h4>
          <p className="text-base text-[var(--t2)] font-medium leading-relaxed opacity-90 italic font-sans hover:opacity-100 transition-opacity">Every content cycle multiplies your visibility and lead flow automatically. Founders focus 100% on science.</p>
        </div>
        <div className="shrink-0 relative z-10 w-full md:w-auto mt-6 md:mt-0">
          <button
            onClick={onSwitchToSales}
            className="flex items-center justify-center w-full md:w-auto gap-3 px-8 py-4 rounded-xl bg-[var(--tx)] text-white text-sm font-bold shadow-sm transition-all hover:bg-[var(--gn)] active:scale-[0.98]"
          >
            See Sales Pipeline
            <ArrowRight size={18} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
