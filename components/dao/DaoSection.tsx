"use client";

import React from "react";
import { Badge } from "../shared/Badge";
import { SectionHeader } from "../shared/SectionHeader";
import {
  DAO_STATS, DAO_STEPS, PROPOSALS, TOKEN_ALLOCATIONS, FLYWHEEL_NODES,
} from "../../lib/constants";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";
import {
  BarChart3, Users, Zap, Coins, ArrowRight, ShieldCheck,
  Vote, Award, Wallet, ExternalLink, Activity
} from "lucide-react";

const ICON_MAP: Record<string, any> = {
  "📊": <BarChart3 size={20} />,
  "👥": <Users size={20} />,
  "⚡": <Zap size={20} />,
  "💰": <Coins size={20} />,
  "🗳️": <Vote size={24} />,
  "🏆": <Award size={24} />,
  "🏦": <Wallet size={24} />,
  "💸": <Coins size={20} />,
  "🔬": <Activity size={20} />,
  "📈": <BarChart3 size={20} />,
  "🔄": <Activity size={20} />,
  "1": <ShieldCheck size={24} />,
  "2": <ShieldCheck size={24} />,
  "3": <ShieldCheck size={24} />,
  "4": <ShieldCheck size={24} />,
};

// ─── DAO Stats Row ─────────────────────────────────────────────
function DaoStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
      {DAO_STATS.map((s, idx) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ y: -4 }}
          className="bg-white border border-[var(--bdA)] rounded-2xl p-5 text-center shadow-sm flex flex-col items-center hover:shadow-md hover:border-[var(--gn)] transition-all"
        >
          <div className="w-12 h-12 rounded-xl bg-[var(--bgA)] border border-[var(--bdM)] flex items-center justify-center text-[var(--gn)] mb-3 shadow-sm">
            {ICON_MAP[s.icon] || s.icon}
          </div>
          <p className="text-3xl font-bold text-gradient tracking-tight leading-none mb-2">
            {s.value}
          </p>
          <p className="text-[0.65rem] font-bold text-[var(--tx)] mb-1 uppercase tracking-widest">{s.label}</p>
          <p className="text-[0.65rem] text-[var(--t3)] font-medium leading-relaxed max-w-[140px]">{s.sub}</p>
        </motion.div>
      ))}
    </div>
  );
}

// ─── DAO Steps ─────────────────────────────────────────────────
function DaoSteps() {
  return (
    <div className="mb-14">
      <div className="flex items-center gap-4 mb-6">
        <span className="text-[0.65rem] font-bold uppercase tracking-widest text-[var(--gn)]">Funding lifecycle</span>
        <div className="h-px bg-[var(--bdM)] flex-1" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {DAO_STEPS.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="group relative p-5 bg-slate-50 border border-[var(--bdA)] rounded-2xl transition-all hover:bg-white hover:border-[var(--gn)] hover:shadow-md"
          >
            <div className="absolute top-4 right-6 text-3xl font-bold text-[var(--tx)] opacity-[0.05] select-none group-hover:opacity-[0.1] transition-opacity">
              {step.number}
            </div>
            <div className="w-10 h-10 rounded-xl bg-white border border-[var(--bdM)] flex items-center justify-center text-[var(--gn)] mb-4 shadow-sm group-hover:bg-[var(--gn)] group-hover:text-white transition-colors">
              {ICON_MAP[step.icon] || step.icon}
            </div>
            <h4 className="text-base font-bold text-[var(--tx)] mb-2 tracking-tight">
              {step.title}
            </h4>
            <p className="text-sm text-[var(--t2)] leading-relaxed font-medium">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Flywheel ──────────────────────────────────────────────────
function DaoFlywheel() {
  return (
    <div className="bg-[var(--tx)] rounded-3xl p-8 lg:p-12 mb-14 relative overflow-hidden text-white shadow-lg">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[var(--gn)]/20 blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="text-center mb-10 relative z-10">
        <Badge variant="green" dot className="bg-white/10 border-white/20 text-white mb-6 shadow-sm px-3 py-1 font-bold uppercase tracking-widest text-[0.65rem]">Economic Protocol</Badge>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
          The $HASHS <span className="text-gn-gradient">Flywheel</span> Effect.
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10 items-center">
        {FLYWHEEL_NODES.slice(0, 3).map((node, i) => (
          <React.Fragment key={node.title}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex w-full flex-col items-center text-center p-6 rounded-2xl border bg-white/5 backdrop-blur-md transition-all border-white/10 shadow-sm hover:bg-white/10">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-[var(--gn)] mb-6 shadow-sm">
                {ICON_MAP[node.icon] || node.icon}
              </div>
              <p className="font-bold text-lg mb-2 tracking-tight">{node.title}</p>
              <p className="text-sm text-white/70 leading-relaxed font-medium">{node.sub}</p>
            </motion.div>

          </React.Fragment>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        <div className="flex items-center gap-3">
          <Activity className="text-[var(--gn)]" size={20} />
          <p className="text-sm font-medium text-white/80 italic font-sans hover:text-white transition-colors">Every batch success fuels the next generation of BioTech innovation.</p>
        </div>
        <a href="https://blog.hashs.exchange/buy-hashs-with-eth/" target="_blank" className="flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-[var(--tx)] text-sm font-bold transition-all hover:bg-[var(--gn)] hover:text-white shadow-sm active:scale-95">
          Explore $HASHS
          <ExternalLink size={16} />
        </a>
      </div>
    </div>
  );
}

// ─── Proposals ─────────────────────────────────────────────────
function DaoProposals() {
  return (
    <div className="bg-white border border-[var(--bdM)] rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--bdM)]">
        <div>
          <h3 className="text-2xl font-bold text-[var(--tx)] tracking-tight">Active Governance</h3>
          <p className="text-sm text-[var(--t3)] font-medium mt-1">Shaping the future of Batch 4 funding.</p>
        </div>
        <button className="flex items-center gap-1.5 text-[var(--gn)] font-bold text-sm hover:underline">
          Snapshot LP ↗
        </button>
      </div>

      <div className="space-y-4 flex-1">
        {PROPOSALS.map((p) => (
          <motion.div
            key={p.id}
            whileHover={{ x: 3 }}
            className="p-6 bg-slate-50 rounded-2xl border border-[var(--bdM)] group transition-all hover:border-[var(--gn)] hover:bg-white hover:shadow-sm"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[0.65rem] font-bold text-[var(--gn)] tracking-widest">{p.id}</span>
                  {p.status === "active" ? (
                    <Badge variant="green" dot className="bg-white border-[var(--gn)]/20 shadow-sm text-xs px-2 py-0.5">VOTING OPEN</Badge>
                  ) : (
                    <Badge variant="default" className="bg-white shadow-sm text-xs px-2 py-0.5">PASSED</Badge>
                  )}
                </div>
                <h4 className="text-lg font-bold text-[var(--tx)] leading-tight tracking-tight">{p.title}</h4>
              </div>
              <div className="text-right shrink-0">
                <p className="text-2xl font-bold text-[var(--gn)] leading-none mb-1.5">{p.forPct}%</p>
                <div className="flex items-center gap-1.5 justify-end">
                  <div className="w-1 h-1 rounded-full bg-[var(--gn)]" />
                  <p className="text-[0.6rem] font-bold text-[var(--t3)] uppercase tracking-wider">Favoring Consensus</p>
                </div>
              </div>
            </div>

            <div className="h-2 bg-white border border-[var(--bdM)] rounded-full overflow-hidden mb-4 p-[1px]">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${p.forPct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-[var(--gn)] rounded-full"
              />
            </div>

            <div className="flex justify-between text-[0.65rem] font-bold text-[var(--t3)] uppercase tracking-widest px-1">
              <span>{p.forCount.toLocaleString()} $HASHS FOR</span>
              <span>{p.againstCount.toLocaleString()} AGAINST</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Token Allocation ──────────────────────────────────────────
function DaoAllocation() {
  return (
    <div className="bg-[var(--tx)] text-white border border-[var(--tx)] rounded-3xl p-8 relative overflow-hidden shadow-lg h-full flex flex-col justify-between">
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[var(--ea)]/15 blur-[80px] translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/10 shadow-sm">
            <Coins size={18} className="text-[var(--gn)]" />
          </div>
          <div>
            <h3 className="text-xl font-bold tracking-tight">$HASHS Asset</h3>
            <p className="text-[0.65rem] text-white/50 font-bold uppercase tracking-widest">Bio-Incentive Layer</p>
          </div>
        </div>

        {/* Allocation bar - Premium */}
        <div className="h-4 bg-white/5 rounded-full overflow-hidden flex gap-0.5 mb-10 p-0.5 border border-white/10">
          {TOKEN_ALLOCATIONS.map((a) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="h-full rounded-full"
              style={{ width: `${a.pct}%`, background: a.color }}
            />
          ))}
        </div>

        <div className="space-y-4 mb-12">
          {TOKEN_ALLOCATIONS.map((a, idx) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, y: 5 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex justify-between items-center py-3 border-b border-white/5 last:border-0"
            >
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full ring-2 ring-white/5" style={{ background: a.color }} />
                <span className="text-sm font-bold text-white/80">{a.label}</span>
              </div>
              <span className="text-base font-bold font-mono">{a.pct}%</span>
            </motion.div>
          ))}
        </div>

        <div className="space-y-4">
          <button className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl bg-[var(--gn)] text-white text-sm font-bold transition-all hover:bg-[var(--g2)] shadow-sm hover:shadow-md active:scale-95">
            Secure Governance Tokens
            <ArrowRight size={18} />
          </button>
          <div className="flex items-center justify-center gap-1.5 opacity-50">
            <ShieldCheck size={12} />
            <p className="text-[0.65rem] font-bold uppercase tracking-widest">Audited by CertiK & OpenZeppelin</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── DAO Section (main) ────────────────────────────────────────
export function DaoSection() {
  return (
    <section id="dao-section" className="section-py relative overflow-hidden bg-white border-t border-[var(--bdA)]">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--gn)]/[0.02] rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />

      <div className="section-max relative z-10">
        {/* Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,1.1fr] gap-10 lg:gap-14 items-center justify-center mb-14">

          <SectionHeader
            center
            eyebrow="Protocol Live · ERC-20 · Ethereum Mainnet"
            title={<>Decentralising funding<br />for <i className="text-[var(--gn)] heading-font tracking-tight font-black">on-chain startups.</i></>}
            lead="We use DAO-based funding specifically for startups where on-chain operations are a genuine part of their model — as per our selection criteria. $HASHS token holders vote on every funding decision, treasury allocation, and batch expansion. No central authority. Fully transparent. Science-first. Chain-native."
          />

          <div className="mt-8 space-y-5">
            <div className="bg-[var(--tx)] rounded-2xl p-5 border border-white/10 group overflow-hidden relative shadow-lg">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <ShieldCheck size={40} className="text-white" />
              </div>
              <p className="text-[0.65rem] font-bold text-white/50 uppercase tracking-widest mb-3">$HASHS Contract Address · Ethereum Mainnet</p>
              <code className="text-sm font-mono text-[var(--gn)] font-bold break-all leading-relaxed block mb-4">
                0xe410d33fed4593aa075974bc4a351ae7215e0c63
              </code>
              <div className="flex gap-4 flex-wrap">
                <a href="https://etherscan.io/token/0xe410d33fed4593aa075974bc4a351ae7215e0c63" target="_blank" className="text-[0.65rem] text-[var(--gn)] border border-[var(--gbr)] rounded-md px-2 py-1 transition-all bg-[var(--gbg)] hover:bg-[#daf0e5] font-bold">Etherscan ↗</a>
                <a href="https://app.uniswap.org/swap?outputCurrency=0xe410d33fed4593aa075974bc4a351ae7215e0c63" target="_blank" className="text-[0.65rem] text-[var(--gn)] border border-[var(--gbr)] rounded-md px-2 py-1 transition-all bg-[var(--gbg)] hover:bg-[#daf0e5] font-bold">Uniswap ↗</a>
                <a href="https://hashs.exchange" target="_blank" className="text-[0.65rem] text-[var(--gn)] border border-[var(--gbr)] rounded-md px-2 py-1 transition-all bg-[var(--gbg)] hover:bg-[#daf0e5] font-bold">hashs.exchange ↗</a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 mt-6 lg:mt-0">
            <div className="font-['DM_Mono',monospace] text-[0.65rem] font-bold tracking-widest uppercase text-[var(--t3)] mb-1">$HASHS Utility — four core uses</div>
            {[
              { icon: "🗳️", title: "Governance voting", desc: "1 $HASHS = 1 vote. Token holders decide which on-chain Agritech and Biotech startups receive funding, the composition of each batch, and every treasury allocation." },
              { icon: "🏆", title: "Founder & researcher rewards", desc: "Founders, mentors, and researchers earn $HASHS by contributing verified on-chain impact — crop field scans, biotech experiments, clinical milestones, farm deployments, patent filings." },
              { icon: "💎", title: "Staking for ecosystem access", desc: "Stake $HASHS to unlock compute priority within ABventures AI Lab, early access to deal flow, and co-investment rights alongside the DAO treasury in funded startups." },
              { icon: "🏦", title: "DAO treasury control", desc: "Every funded batch, mentorship pool, and strategic partnership — including AI Lab compute costs and expansion — requires a $HASHS governance vote. No central approval ever." }
            ].map((item, id) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: id * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ x: 3 }}
                className="p-4 md:p-5 bg-slate-50 border border-[var(--bdA)] rounded-xl flex gap-4 hover:border-[var(--gn)] hover:shadow-sm hover:bg-white transition-all cursor-default shadow-sm group"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-[var(--bdM)] flex items-center justify-center text-[var(--gn)] shrink-0 shadow-sm transition-colors duration-300">
                  {item.icon === "🗳️" ? <Vote size={18} /> : item.icon === "🏆" ? <Award size={18} /> : item.icon === "💎" ? "💎" : <Wallet size={18} />}
                </div>
                <div>
                  <h4 className="text-[0.85rem] md:text-sm font-bold text-[var(--tx)] mb-1 tracking-tight">{item.title}</h4>
                  <p className="text-[0.7rem] md:text-xs text-[var(--t2)] leading-relaxed font-medium">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <DaoStats />
        <DaoSteps />
        <DaoFlywheel />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr,360px] gap-6 lg:gap-8 items-stretch">
          <DaoProposals />
          <DaoAllocation />
        </div>
      </div>
    </section>
  );
}
