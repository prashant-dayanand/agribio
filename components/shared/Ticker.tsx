"use client";

import { TICKER_ITEMS } from "../../lib/constants";
import { cn } from "../../lib/utils";

export function Ticker() {
  // Duplicate items for seamless loop
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="relative overflow-hidden rounded-xl py-3 mb-10 bg-slate-50 border border-[var(--bdA)] shadow-sm">
      {/* Fixed label */}
      <div className="absolute left-0 top-0 bottom-0 flex items-center px-4 bg-slate-50 border-r border-[var(--bdA)] z-10 shadow-sm">
        <span className="text-[0.65rem] font-bold tracking-widest uppercase text-[var(--t3)] whitespace-nowrap">
          AI Citation Flow
        </span>
      </div>

      {/* Scrolling track */}
      <div className="flex gap-0 ticker-animate pl-[160px]">
        {items.map((item, i) => (
          <div key={i} className="flex items-center shrink-0">
            <div
              className={cn(
                "rounded-lg px-4 py-1.5 whitespace-nowrap text-xs font-bold flex items-center gap-2 mr-0 transition-colors shadow-sm cursor-default",
                "border",
                item.highlight
                  ? "bg-[var(--gn)]/10 border-[var(--gn)]/20 text-[var(--gn)]"
                  : "bg-white border-[var(--bdM)] text-[var(--tx)] hover:border-[var(--gn)]"
              )}
            >
              {item.label}
            </div>
            <span className="px-3 text-[var(--t4)] text-lg shrink-0">›</span>
          </div>
        ))}
      </div>
    </div>
  );
}
