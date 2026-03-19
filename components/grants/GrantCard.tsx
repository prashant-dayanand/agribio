"use client";

import { Badge } from "../shared/Badge";
import type { Grant } from "../../lib/types";
import { cn } from "../../lib/utils";

interface GrantCardProps {
  grant: Grant;
}

const sectorClass: Record<string, string> = {
  agri: "bg-[var(--gbg)] border-[var(--gbr)] text-[var(--gn)]",
  bio: "bg-[var(--bbg)] border-[var(--bbr)] text-[var(--bl)]",
  tech: "bg-[var(--abg)] border-[var(--abr)] text-[var(--am)]",
  default: "bg-[var(--bgA)] border-[var(--bd)] text-[var(--t2)]",
};

export function GrantCard({ grant }: GrantCardProps) {
  return (
    <div className="group flex flex-col bg-white border border-[var(--bdM)] rounded-2xl p-6 hover:border-[var(--gn)] hover:shadow-md hover:-translate-y-1 hover:bg-slate-50/30 transition-all duration-300 relative overflow-hidden">
      {/* Badges & ID */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="px-2 py-0.5 bg-[var(--bgA)] border border-[var(--bdM)] rounded text-[0.65rem] font-bold">
            {grant.flag}
          </div>
          {grant.badges.slice(0, 1).map((b) => (
            <Badge key={b.label} variant={b.variant} dot>{b.label}</Badge>
          ))}
        </div>
        <span className="text-[0.6rem] font-bold text-[var(--t4)] font-mono uppercase tracking-widest">
          {grant.id}
        </span>
      </div>

      {/* Org & Name */}
      <div className="mb-4">
        <p className="text-[0.65rem] font-bold text-[var(--t3)] uppercase tracking-wider mb-1">
          {grant.org}
        </p>
        <h3 className="text-xl font-bold text-[var(--tx)] leading-snug group-hover:text-[var(--gn)] transition-colors">
          {grant.name}
        </h3>
      </div>

      {/* Description */}
      <p className="text-sm text-[var(--t2)] leading-relaxed mb-6 flex-1">
        {grant.description}
      </p>

      {/* Key Stats */}
      <div className="grid grid-cols-2 gap-4 border-t border-b border-[var(--bd)] py-4 mb-5 bg-[var(--bgA)]/20 -mx-6 px-6">
        {grant.amounts.slice(0, 1).map((a) => (
          <div key={a.label}>
            <p className="text-[0.6rem] font-bold text-[var(--t3)] uppercase mb-1">{a.label}</p>
            <p className="text-base font-bold text-[var(--gn)] tracking-tight">{a.value}</p>
          </div>
        ))}
        <div>
          <p className="text-[0.6rem] font-bold text-[var(--t3)] uppercase mb-1">Timeline</p>
          <p className="text-base font-bold text-[var(--ea)] tracking-tight">{grant.deadline}</p>
        </div>
      </div>

      {/* Sector Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {grant.sectors.map((s) => (
          <span
            key={s.label}
            className={cn(
              "px-2.5 py-1 rounded-md text-[0.65rem] font-bold border transition-colors",
              sectorClass[s.type] || sectorClass.default
            )}
          >
            {s.label}
          </span>
        ))}
      </div>

      {/* Action */}
      <button className="flex items-center justify-center w-full px-4 py-2.5 rounded-xl bg-[var(--tx)] text-white text-sm font-bold transition-colors hover:bg-[var(--gn)]">
        Check Requirements →
      </button>

      {/* Metadata */}
      <div className="mt-5 pt-4 border-t border-[var(--bd)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--gn)] dot-blink" />
          <span className="text-[0.65rem] font-bold text-[var(--t3)] uppercase tracking-wider">ABV Assist Active</span>
        </div>
        <span className="text-[0.65rem] font-bold text-[var(--t4)] uppercase">{grant.deadlineSub}</span>
      </div>
    </div>
  );
}
