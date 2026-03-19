"use client";

import { cn } from "../../lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: string;
  center?: boolean;
  className?: string;
}

export function SectionHeader({ eyebrow, title, lead, center = false, className }: SectionHeaderProps) {
  return (
    <div className={cn("max-w-[1000px] mx-auto", center ? "text-center" : "text-left", className)}>
      {eyebrow && (
        <div className={cn("inline-flex items-center gap-2 mb-4", center && "justify-center")}>
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--gn)]" />
          <span className="text-[0.65rem] font-bold tracking-widest uppercase text-[var(--t3)] font-sans">
            {eyebrow}
          </span>
        </div>
      )}

      <h2 className="text-4xl  font-bold tracking-tight text-[var(--tx)] leading-tight mb-6">
        {title}
      </h2>

      {lead && (
        <p className={cn(
          "text-sm text-[var(--t2)] leading-relaxed max-w-[720px]",
          center && "mx-auto"
        )}>
          {lead}
        </p>
      )}
    </div>
  );
}
