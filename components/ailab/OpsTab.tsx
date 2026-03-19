"use client";

import { OPS_CARDS, MATRIX_ROWS } from "../../lib/constants";
import type { OpsCard, MatrixRow } from "../../lib/types";
import { Badge } from "../shared/Badge";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";
import {
  CheckCircle2, Clock, FileText, Activity,
  Settings, ShieldCheck, Database, Rocket,
  Search, Users, ArrowRight, Sparkles, Cpu, Landmark
} from "lucide-react";

const ICON_MAP: Record<string, any> = {
  "📈": <Activity size={20} />,
  "📄": <FileText size={20} />,
  "⚙️": <Settings size={20} />,
};

function OpsCardItem({ card }: { card: OpsCard }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white border border-[var(--bdA)] rounded-2xl p-6 flex flex-col h-full shadow-sm hover:shadow-md hover:border-[var(--gn)] transition-all duration-300 group"
    >
      <div className="w-12 h-12 rounded-xl bg-[var(--bgA)] border border-[var(--bdM)] flex items-center justify-center text-[var(--gn)] mb-6 group-hover:bg-[var(--gn)] group-hover:text-white transition-colors duration-300 shadow-sm">
        {ICON_MAP[card.icon] || card.icon}
      </div>
      <h4 className="text-xl font-bold text-[var(--tx)] mb-3 tracking-tight group-hover:text-[var(--gn)] transition-colors">{card.name}</h4>
      <p className="text-sm text-[var(--t2)] leading-relaxed mb-6 font-medium italic opacity-80 flex-1">{card.description}</p>
      <div className="space-y-3 pt-6 border-t border-[var(--bdA)]">
        {card.bullets.map((b) => (
          <div key={b} className="flex gap-2.5 text-xs text-[var(--t3)] font-bold leading-relaxed items-start">
            <CheckCircle2 size={14} className="text-[var(--gn)] shrink-0 mt-0.5" />
            <span className="tracking-tight">{b}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

const checkStyles: Record<string, any> = {
  yes: { bg: "bg-[var(--gn)]", icon: <CheckCircle2 size={10} className="text-white" /> },
  no: { bg: "bg-white border border-[var(--bdM)]", icon: null },
  recv: { bg: "bg-blue-500", icon: <CheckCircle2 size={10} className="text-white" /> },
};

function MatrixRowItem({ row }: { row: MatrixRow }) {
  return (
    <motion.div
      whileHover={{ scale: 1.002, x: 2 }}
      className="grid grid-cols-1 md:grid-cols-[250px,1fr,1fr,1fr] border-b border-[var(--bdM)] last:border-0 hover:bg-slate-50 transition-all group relative items-center"
    >
      <div className="px-6 py-4 text-sm font-semibold text-[var(--tx)] border-r border-[var(--bdM)] flex items-center bg-[var(--bgA)]/30 group-hover:bg-transparent transition-colors">
        {row.task}
      </div>
      {[row.founder, row.ailab, row.dao].map((cell, ci) => (
        <div
          key={ci}
          className="px-6 py-4 border-r border-[var(--bdM)] last:border-0 flex items-center gap-4"
        >
          <div className={cn(
            "w-5 h-5 rounded flex items-center justify-center shrink-0 shadow-sm",
            checkStyles[cell.variant].bg
          )}>
            {checkStyles[cell.variant].icon}
          </div>
          <span className={cn(
            "text-xs font-bold uppercase tracking-widest",
            cell.variant === "no" ? "text-[var(--t4)] opacity-50" : "text-[var(--tx)]"
          )}>{cell.label}</span>
        </div>
      ))}
    </motion.div>
  );
}

export function OpsTab() {
  return (
    <div className="space-y-16">
      {/* Intro */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr,0.9fr] gap-16 items-start">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <Badge variant="amber" dot className="bg-amber-500/5 text-amber-600 border-amber-500/20 shadow-sm uppercase tracking-widest text-xs">Efficiency Standard</Badge>
            <span className="text-xs font-bold text-[var(--t3)] uppercase tracking-widest italic font-sans">Automated Compliance</span>
          </div>
          <h3 className="text-4xl md:text-5xl font-bold text-[var(--tx)] leading-[1.1] tracking-tight mb-8">
            Company ops on <br className="hidden md:block" />
            <span className="text-gn-gradient italic font-medium font-sans">Autopilot.</span>
          </h3>
          <p className="text-lg text-[var(--t2)] font-medium leading-relaxed max-w-[580px]">
            OKRs auto-tracked. Investor updates auto-drafted. On-chain impact auto-logged. The only thing a founder does is check one dashboard and approve the flow.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 lg:mt-0">
          {[
            { val: "<10m", title: "Founder Active Time", sub: "Weekly review & approvals.", icon: Clock, variant: "amber" },
            { val: "0", title: "Manual Reports", sub: "Auto-generated from sources.", icon: FileText, variant: "green" },
          ].map((s) => (
            <motion.div
              key={s.title}
              whileHover={{ y: -4 }}
              className="bg-white border border-[var(--bdA)] rounded-2xl p-6 shadow-sm border-l-[3px] transition-shadow hover:shadow-md"
              style={{ borderLeftColor: s.variant === "amber" ? "var(--ea)" : "var(--gn)" }}
            >
              <span className={cn("text-3xl font-bold tracking-tight leading-none mb-3 block", s.variant === "amber" ? "text-[var(--ea)]" : "text-[var(--gn)]")}>
                {s.val}
              </span>
              <p className="font-bold text-sm text-[var(--tx)] mb-1 tracking-tight">{s.title}</p>
              <p className="text-xs text-[var(--t3)] font-medium leading-relaxed">{s.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Ops Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {OPS_CARDS.map((card) => (
          <OpsCardItem key={card.name} card={card} />
        ))}
      </div>

      {/* Responsibility Matrix - Professional Table */}
      <div className="bg-white border border-[var(--bdM)] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow mb-8 relative group">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-transparent pointer-events-none" />

        <div className="p-8 border-b border-[var(--bdM)] bg-[var(--tx)] text-white relative z-10 overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <ShieldCheck size={80} />
          </div>
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="text-[var(--gn)]" size={18} />
            <Badge variant="green" className="bg-white/10 border-white/20 text-white font-bold tracking-widest text-[0.6rem] px-3 shadow-sm">ENFORCED VIA AGRO</Badge>
          </div>
          <h4 className="text-2xl font-bold tracking-tight mb-2 leading-tight">Accountability Matrix</h4>
          <p className="text-sm text-white/60 font-medium font-sans">Automatic role enforcement via AGRO-CORE v2.4 protocol.</p>
        </div>

        {/* Table Header */}
        <div className="hidden md:grid grid-cols-[250px,1fr,1fr,1fr] bg-slate-50 border-b border-[var(--bdM)] text-[0.65rem] font-bold uppercase tracking-widest text-[var(--t3)] relative z-10">
          <div className="px-6 py-4 border-r border-[var(--bdM)]">Category</div>
          <div className="px-6 py-4 border-r border-[var(--bdM)] flex items-center gap-2"><Users size={12} /> Founder</div>
          <div className="px-6 py-4 border-r border-[var(--bdM)] flex items-center gap-2 text-[var(--gn)]"><Cpu size={12} /> AI Lab</div>
          <div className="px-6 py-4 flex items-center gap-2 text-blue-600"><Landmark size={12} /> DAO</div>
        </div>

        <div className="divide-y divide-[var(--bdM)] relative z-10">
          {MATRIX_ROWS.slice(0, 5).map((row, i) => (
            <MatrixRowItem key={i} row={row} />
          ))}
        </div>

        <div className="p-6 bg-white text-center border-t border-[var(--bdM)] relative z-10">
          <button className="flex items-center justify-center w-full md:w-auto gap-2 mx-auto px-6 py-3 rounded-xl bg-white border border-[var(--bdM)] text-sm font-bold text-[var(--tx)] transition-all hover:bg-[var(--tx)] hover:text-white shadow-sm hover:shadow-md">
            Download Operations Handbook
            <Rocket size={16} />
          </button>
        </div>
      </div>

      {/* Lab Final Note */}
      <div className="flex flex-col md:flex-row items-center justify-between p-8 bg-slate-50 rounded-2xl border border-[var(--bdA)] gap-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[var(--gn)]/10 flex items-center justify-center text-[var(--gn)] shrink-0">
            <Database size={18} />
          </div>
          <p className="text-sm font-bold text-[var(--tx)] leading-snug">All operational logs are mirrored to the DAO Treasury for transparency.</p>
        </div>
        <div className="flex items-center gap-2 text-[var(--t3)] font-bold uppercase tracking-widest text-[0.65rem] shrink-0">
          Audit ID: AGRO-8822-OPS
          <ShieldCheck size={14} className="text-[var(--gn)]" />
        </div>
      </div>
    </div>
  );
}
