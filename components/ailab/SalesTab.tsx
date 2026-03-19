"use client";

import { Badge } from "../shared/Badge";
import { PIPELINE_STEPS, LIVE_LEADS } from "../../lib/constants";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";
import {
  Zap, Activity, Globe, MousePointer2,
  ShieldCheck, Search, Users, TrendingUp,
  ArrowRight, Landmark, Mail, ClipboardList
} from "lucide-react";

const agentTagStyles: Record<string, any> = {
  green: "green",
  blue: "blue",
  earth: "amber",
  amber: "amber",
};

const ICON_MAP: Record<string, any> = {
  "1": <Search size={18} />,
  "2": <MousePointer2 size={18} />,
  "3": <ClipboardList size={18} />,
  "4": <Mail size={18} />,
};

export function SalesTab() {
  return (
    <div className="space-y-16">
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr,0.9fr] gap-16 items-start">
        {/* Left column */}
        <div>
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="blue" dot className="bg-blue-500/5 text-blue-600 border-blue-500/20 shadow-sm">Inbound Focused</Badge>
              <span className="text-xs font-bold text-[var(--t3)] uppercase tracking-widest italic font-sans">Zero Outreach Required</span>
            </div>
            <h3 className="text-4xl lg:text-5xl font-bold text-[var(--tx)] leading-[1.1] tracking-tight mb-8">
              Qualified leads. <br className="hidden md:block" />
              <span className="text-gn-gradient italic font-medium font-sans">Human verification inclusive.</span>
            </h3>
            <p className="text-lg text-[var(--t2)] font-medium leading-relaxed max-w-[600px]">
              The Research Agent maps exactly what your buyers are searching. Content is built to answer those searches. Every visitor is captured, intent-scored, and verified.
            </p>
          </div>

          {/* Live dashboard - High Contrast */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--bdM)]">
              <div>
                <h4 className="text-[0.7rem] font-bold uppercase tracking-widest text-[var(--t3)]">Live Inbound Feed</h4>
                <p className="text-lg font-bold text-[var(--tx)] mt-1">Active Bio-Tech Pipeline</p>
              </div>
              <div className="flex items-center gap-2 bg-[var(--gn)]/5 px-4 py-2 rounded-full border border-[var(--gn)]/20 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--gn)] animate-ping" />
                <span className="text-[0.65rem] font-bold text-[var(--gn)] uppercase tracking-widest">Live Monitor</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {LIVE_LEADS.map((lead, idx) => (
                <motion.div
                  key={lead.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white border border-[var(--bdA)] rounded-2xl p-6 flex items-center gap-6 transition-all hover:bg-slate-50 hover:shadow-md hover:border-[var(--gn)] group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[var(--bgA)] border border-[var(--bdM)] flex items-center justify-center text-[var(--gn)] shrink-0 group-hover:bg-[var(--gn)] group-hover:text-white transition-colors duration-300 shadow-sm">
                    <Landmark size={20} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-lg text-[var(--tx)] truncate mb-1">{lead.name}</p>
                    <p className="text-xs text-[var(--t3)] font-bold uppercase tracking-widest opacity-80">{lead.meta}</p>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-2xl font-bold text-[var(--gn)] tracking-tight leading-none mb-1">
                      {lead.count}
                    </p>
                    <div className="flex items-center gap-1.5 justify-end">
                      <TrendingUp size={12} className="text-[var(--gn)]" />
                      <p className="text-[0.6rem] font-bold text-[var(--t4)] uppercase tracking-wider">leads/mo</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Analytics card - Ultra Premium */}
          <div className="bg-[var(--tx)] text-white/90 rounded-3xl p-8 border border-white/5 relative overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[var(--bl)]/10 blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="flex items-center gap-3 mb-8 relative z-10">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center border border-white/10 shadow-sm">
                <Activity size={18} className="text-blue-400" />
              </div>
              <h4 className="text-[0.65rem] font-bold uppercase tracking-widest text-white/50">Lead Analytics</h4>
            </div>

            <div className="space-y-6 relative z-10">
              {[
                { label: "AI Discovery", value: <Badge variant="blue" className="bg-white/5 border-white/10 text-white shadow-sm font-semibold uppercase tracking-widest text-[0.6rem]">Gemini Pro</Badge> },
                { label: "Intent Score", value: <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[var(--gn)]" /><span className="font-mono font-bold text-[var(--gn)] text-sm">94% High Intent</span></div> },
                { label: "Bot Protection", value: <Badge variant="green" className="bg-white/5 border-white/10 text-white shadow-sm font-semibold uppercase tracking-widest text-[0.6rem]">✓ Verified</Badge> },
                { label: "Discovery Query", value: <span className="text-[0.85rem] text-white/60 italic leading-relaxed font-sans max-w-[200px] text-right truncate">&quot;Enterprise Bio-AI scale&quot;</span> },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between py-4 border-b border-white/5 last:border-0"
                >
                  <span className="text-sm font-bold text-white/70">{row.label}</span>
                  {row.value}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column — Pipeline steps */}
        <div className="bg-white border border-[var(--bdM)] rounded-3xl p-8 lg:p-12 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-50/50 to-transparent opacity-60 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-12 pb-6 border-b border-[var(--bdM)]">
              <div>
                <h3 className="text-2xl font-bold tracking-tight">Sales Lifecycle</h3>
                <p className="text-sm text-[var(--t3)] font-medium mt-1">The Inbound Engine path.</p>
              </div>
              <Badge variant="green" dot className="bg-[var(--gn)]/5 border-[var(--gn)]/20 shadow-sm px-4">Automated</Badge>
            </div>

            <div className="space-y-12 relative">
              {/* Connection line */}
              <div className="absolute left-[23px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-[var(--gn)]/20 via-[var(--gn)]/40 to-[var(--gn)]/10" />

              {PIPELINE_STEPS.map((step) => (
                <div key={step.number} className="flex gap-8 relative z-10 transition-all group/step">
                  <div className="w-12 h-12 rounded-xl bg-white border border-[var(--bdM)] flex items-center justify-center font-bold text-[var(--gn)] text-lg shrink-0 group-hover/step:border-[var(--gn)] shadow-sm transition-all duration-300 group-hover/step:bg-[var(--gn)] group-hover/step:text-white group-hover/step:scale-105 z-10">
                    {ICON_MAP[step.number] || step.number}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[var(--tx)] mb-2 tracking-tight transition-colors group-hover/step:text-[var(--gn)]">{step.title}</h4>
                    <p className="text-sm text-[var(--t2)] leading-relaxed mb-4 font-medium italic opacity-80">{step.description}</p>
                    <Badge variant={agentTagStyles[step.agentVariant]} dot className="shadow-sm uppercase tracking-widest text-[0.6rem] px-3 font-bold">
                      {step.agentLabel}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 p-8 bg-[var(--tx)] rounded-2xl border border-white/5 text-white/90 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Activity size={20} className="text-[var(--gn)]" />
                <h4 className="text-base font-bold tracking-tight">Timeline to Inbound</h4>
              </div>
              <p className="text-sm text-white/70 leading-relaxed font-bold font-sans italic">STARTUPS SEE ACCELERATED LEAD FLOW WITHIN 90-120 DAYS. THE PIPELINE SCALES WITH YOUR SCIENTIFIC OUTPUT.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
