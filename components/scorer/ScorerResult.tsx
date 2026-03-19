"use client";

import { useEffect, useRef } from "react";
import { Button } from "@heroui/react";
import { Badge } from "../shared/Badge";
import type { ScoreResult } from "../../lib/types";

interface ScorerResultProps {
  result: ScoreResult;
  onReset: () => void;
}

const VERDICT_CONFIG = {
  Fundable: { bg: "var(--gbg)", color: "var(--gn)", border: "var(--gbr)", emoji: "🟢", badge: "green" as const },
  Promising: { bg: "var(--bbg)", color: "var(--bl)", border: "var(--bbr)", emoji: "🔵", badge: "blue" as const },
  "Needs work": { bg: "var(--abg)", color: "var(--am)", border: "var(--abr)", emoji: "🟡", badge: "amber" as const },
  "Too early": { bg: "var(--bgA)", color: "var(--t2)", border: "var(--bdM)", emoji: "⚪", badge: "default" as const },
};

function ScoreRing({ score }: { score: number }) {
  const arcRef = useRef<SVGCircleElement>(null);
  const circumference = 289;

  useEffect(() => {
    if (arcRef.current) {
      const offset = circumference * (1 - score / 100);
      arcRef.current.style.strokeDashoffset = String(offset);
      arcRef.current.style.stroke =
        score >= 75 ? "var(--gn)" : score >= 50 ? "var(--am)" : "#ef4444";
    }
  }, [score]);

  return (
    <div className="relative w-24 h-24 flex-shrink-0">
      <svg width="96" height="96" viewBox="0 0 110 110" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="55" cy="55" r="46" fill="none" stroke="var(--bd)" strokeWidth="8" />
        <circle
          ref={arcRef}
          cx="55" cy="55" r="46"
          fill="none"
          stroke="var(--gn)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray="289"
          strokeDashoffset="289"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-bold text-3xl tracking-tight text-[var(--tx)] leading-none">
          {score}
        </span>
        <span className="text-[0.6rem] font-bold tracking-widest uppercase text-[var(--t3)] mt-1">
          / 100
        </span>
      </div>
    </div>
  );
}

interface SubScoreBarProps {
  label: string;
  value: number;
  color: string;
  id: string;
}

function SubScoreBar({ label, value, color, id }: SubScoreBarProps) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      if (barRef.current) barRef.current.style.width = `${value}%`;
    }, 100);
  }, [value]);

  return (
    <div className="bg-slate-50 border border-[var(--bdM)] rounded-xl p-4 shadow-sm">
      <p className="text-[0.65rem] font-bold tracking-widest uppercase text-[var(--t3)] mb-2">
        {label}
      </p>
      <p className="font-bold text-2xl tracking-tight text-[var(--tx)] leading-none mb-3">
        {value}<span className="text-sm text-[var(--t3)] font-medium">/100</span>
      </p>
      <div className="h-1.5 rounded-full bg-[var(--bdA)] overflow-hidden">
        <div
          ref={barRef}
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: "0%", background: color }}
        />
      </div>
    </div>
  );
}

export function ScorerResult({ result, onReset }: ScorerResultProps) {
  const vc = VERDICT_CONFIG[result.verdict] || VERDICT_CONFIG["Promising"];

  const ctaTitle =
    result.overall >= 75
      ? "Strong score — apply for DAO funding now."
      : result.overall >= 50
        ? "Promising idea — apply and iterate with us."
        : "Keep building — get mentorship first.";

  const ctaSub =
    result.overall >= 75
      ? "Your idea scores above the ABVentures funding threshold. Apply for Batch 4 to enter the funding review."
      : result.overall >= 50
        ? "Your idea has strong signals. Apply now and work with ABVentures mentors to sharpen it for the ABVentures vote."
        : "Apply to our pre-cohort programme for structured mentorship before the ABVentures funding round.";

  return (
    <div className="p-8 md:p-12">
      {/* Top row */}
      <div className="flex flex-col md:flex-row gap-8 items-start md:items-center pb-8 border-b border-[var(--bdM)] mb-8">
        <ScoreRing score={result.overall} />

        {/* Verdict */}
        <div className="flex-1">
          <span
            className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-[0.65rem] font-bold tracking-widest uppercase mb-3 border shadow-sm"
            style={{ background: vc.bg, color: vc.color, borderColor: vc.border }}
          >
            {vc.emoji} {result.verdict}
          </span>
          <h3 className="font-bold text-2xl tracking-tight text-[var(--tx)] leading-[1.2] mb-2">
            {result.headline}
          </h3>
          <p className="text-sm text-[var(--t2)] leading-relaxed max-w-xl">{result.summary}</p>
        </div>

        {/* DAO Chance */}
        <div className="flex flex-col items-center gap-2 bg-[var(--bgA)] border border-[var(--bdA)] shadow-sm rounded-xl px-6 py-5 text-center shrink-0 min-w-[140px]">
          <span className="font-bold text-3xl tracking-tight text-[var(--gn)] leading-none">
            {result.dao_chance}%
          </span>
          <span className="text-[0.65rem] font-bold tracking-widest uppercase text-[var(--t2)] leading-tight text-center">
            Funding<br />probability
          </span>
          <Badge variant="green" className="mt-2 text-[0.6rem] shadow-sm">ABVentures</Badge>
        </div>
      </div>

      {/* Sub scores */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <SubScoreBar id="problem" label="Problem Clarity" value={result.problem_clarity} color="var(--gn)" />
        <SubScoreBar id="founder" label="Fit & Expertise" value={result.founder_domain_fit} color="var(--bl)" />
        <SubScoreBar id="market" label="Market Timing" value={result.market_timing} color="var(--ea)" />
      </div>

      {/* Signals grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-[var(--gbg)] border border-[var(--gbr)] shadow-sm rounded-xl p-6">
          <p className="text-[0.65rem] font-bold tracking-widest uppercase text-[var(--gn)] mb-4">
            🟢 Top signals
          </p>
          <div className="space-y-3">
            {result.top_signals.map((s, i) => (
              <div key={i} className="text-sm text-[var(--t2)] leading-relaxed flex items-start gap-2">
                <span className="text-[var(--gn)] font-bold shrink-0 mt-0.5">✓</span>
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[var(--ebg)] border border-[var(--ebr)] shadow-sm rounded-xl p-6">
          <p className="text-[0.65rem] font-bold tracking-widest uppercase text-[var(--ea)] mb-4">
            🟡 Watch outs
          </p>
          <div className="space-y-3">
            {result.watch_outs.map((s, i) => (
              <div key={i} className="text-sm text-[var(--t2)] leading-relaxed flex items-start gap-2">
                <span className="text-[var(--ea)] shrink-0 mt-0.5">△</span>
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insight */}
      <div className="bg-slate-50 border border-[var(--bdM)] shadow-sm rounded-xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <Badge variant="green" dot className="shadow-sm">ABventures AI Lab insight</Badge>
        </div>
        <p className="text-sm text-[var(--t2)] leading-relaxed font-medium italic">"{result.ai_insight}"</p>
      </div>

      {/* DAO CTA Strip */}
      <div className="bg-gradient-to-r from-slate-50 to-white border border-[var(--bdM)] shadow-sm rounded-xl p-6 flex items-center justify-between gap-6 flex-wrap mb-6">
        <div className="flex items-center gap-5">
          <div className="w-12 h-12 rounded-xl bg-[var(--gn)]/10 border border-[var(--gn)]/20 flex items-center justify-center text-xl shrink-0">
            🔗
          </div>
          <div>
            <p className="font-bold text-lg text-[var(--tx)] mb-1">{ctaTitle}</p>
            <p className="text-sm text-[var(--t2)] leading-relaxed max-w-xl">{ctaSub}</p>
          </div>
        </div>
        <Button
          as="a"
          href="#"
          className="bg-[var(--gn)] text-white font-bold text-sm px-6 py-3 rounded-xl hover:bg-[var(--tx)] transition-colors w-full md:w-auto shadow-sm hover:shadow-md"
        >
          Apply for Batch 4 →
        </Button>
      </div>

      {/* Reset */}
      <div className="text-center pt-6 border-t border-[var(--bdM)]">
        <button
          onClick={onReset}
          className="bg-transparent border border-transparent text-sm font-bold text-[var(--t3)] cursor-pointer px-4 py-2 rounded-lg transition-all hover:text-[var(--tx)] hover:bg-slate-50 hover:border-[var(--bdA)]"
        >
          ↩ Score a different idea
        </button>
      </div>
    </div>
  );
}
