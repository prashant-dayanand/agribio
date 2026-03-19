"use client";

import { SYSMAP_NODES } from "../../lib/constants";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";
import {
  Dna, Cpu, Search, Database,
  TrendingUp, ShieldCheck, ArrowRight, Zap
} from "lucide-react";

const ICON_MAP: Record<string, any> = {
  "🧬": <Dna size={28} />,
  "🤖": <Cpu size={28} />,
  "📊": <Search size={28} />,
  "🏛️": <Database size={28} />,
};

export function SystemMap() {
  return (
    <div className="bg-white border-y border-[var(--bdM)] py-24 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[400px] bg-[var(--gn)]/5 blur-[120px] -translate-y-1/2 pointer-events-none" />

      <div className="section-max relative z-10">
        <div className="mb-20">
          <div className="inline-flex items-center gap-3 mb-4 px-6 py-2 glass rounded-full border border-[var(--bdM)]">
            <div className="w-2 h-2 rounded-full bg-[var(--gn)] animate-pulse" />
            <span className="text-[0.75rem] font-bold tracking-[0.3em] uppercase text-[var(--t3)] font-sans">
              Operating System Flow
            </span>
          </div>
          <h3 className="text-[2.2rem] font-bold text-[var(--tx)] tracking-tight">The ABventures Pipeline.</h3>
        </div>

        {/* Scrollable track */}
        <div className="flex items-stretch gap-12 overflow-x-auto pb-12 no-scrollbar px-2">
          {SYSMAP_NODES.map((node, i) => (
            <div key={node.title} className="flex items-center flex-shrink-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "w-[300px] border rounded-2xl p-8 transition-all relative overflow-hidden shadow-sm group",
                  node.isActive
                    ? "bg-slate-50 border-[var(--gn)] border"
                    : node.isDark
                      ? "bg-[var(--tx)] border-[var(--tx)] text-white"
                      : "bg-white border-[var(--bdM)] hover:border-[var(--gn)] hover:bg-slate-50"
                )}
              >
                {/* Node counter */}
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <p className="text-4xl font-bold leading-none select-none">0{i + 1}</p>
                </div>

                <div className="flex items-center justify-between mb-8 overflow-hidden">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110",
                    node.isDark ? "bg-white/10 text-[var(--gn)]" : "bg-[var(--gn)]/10 text-[var(--gn)] group-hover:bg-[var(--gn)] group-hover:text-white"
                  )}>
                    {ICON_MAP[node.icon] || node.icon}
                  </div>
                </div>

                <p className={cn(
                  "text-[0.65rem] font-bold uppercase tracking-widest mb-3 font-sans opacity-60",
                  node.isDark ? "text-[var(--gn)]" : "text-[var(--gn)]"
                )}>
                  {node.who}
                </p>

                <h4 className={cn(
                  "text-xl font-bold mb-3 tracking-tight leading-tight",
                  node.isDark ? "text-white" : "text-[var(--tx)]"
                )}>
                  {node.title}
                </h4>

                <p className={cn(
                  "text-sm leading-relaxed font-medium italic",
                  node.isDark ? "text-white/50" : "text-[var(--t2)] opacity-80"
                )}>
                  "{node.description}"
                </p>
              </motion.div>

              {/* Connector - Premium Visual */}

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
