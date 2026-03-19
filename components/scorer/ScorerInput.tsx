"use client";

import { Badge } from "../shared/Badge";
import { EXAMPLE_IDEAS, EXAMPLE_CHIPS } from "../../lib/constants";
import { countWords } from "../../lib/scorer-api";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";
import { Brain, Sparkles, Send, Microscope, Info } from "lucide-react";

interface ScorerInputProps {
  value: string;
  onChange: (val: string) => void;
  onScore: () => void;
  loading: boolean;
}

export function ScorerInput({ value, onChange, onScore, loading }: ScorerInputProps) {
  const words = countWords(value);
  const pct = Math.min((words / 200) * 100, 100);
  const isReady = words >= 30 && words <= 200;

  function fillExample(key: string) {
    onChange(EXAMPLE_IDEAS[key] || "");
  }

  return (
    <div className="flex flex-col bg-slate-50/50">
      <div className="p-8 md:p-12 pb-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl bg-white border border-[var(--bdA)] flex items-center justify-center text-[var(--gn)] shadow-sm">
            <Brain size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold tracking-tight text-[var(--tx)]">
              Describe your Agritech or Biotech idea
            </h3>
            <p className="text-xs text-[var(--t3)] leading-relaxed font-medium mt-1">
              Problem you solve · Your approach · Target market · Why now
            </p>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--gn)]/10 to-[var(--ea)]/10 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <textarea
            value={value}
            onChange={(e) => {
              const val = e.target.value;
              const wc = countWords(val);
              if (wc > 220) return;
              onChange(val);
            }}
            placeholder="Describe your breakthrough... e.g. Using CRISPR to optimize thermal resilience in tropical staple crops..."
            rows={6}
            className={cn(
              "relative w-full bg-white border border-[var(--bdM)] rounded-2xl p-6 outline-none transition-all",
              "focus:border-[var(--gn)] focus:ring-2 focus:ring-[var(--gn)]/10",
              "text-xs text-[var(--tx)] leading-[1.6] placeholder:text-[var(--t4)] resize-none font-medium"
            )}
          />


        </div>

        {/* Word Progress */}
        <div className="mt-2 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Badge variant={words > 200 ? "amber" : "green"} dot className="px-3 py-1 text-[0.65rem] shadow-sm">
              {words} / 200 Words
            </Badge>
            <span className="text-[0.65rem] font-bold text-[var(--t3)] uppercase tracking-widest">
              {words < 30 ? `Min 30 words needed (${30 - words} left)` : "Criteria met"}
            </span>
          </div>
          <div className="h-2 bg-[var(--bdM)] rounded-full overflow-hidden p-[1px]">
            <motion.div
              layout
              className={cn(
                "h-full rounded-full transition-colors duration-300",
                words > 200 ? "bg-[#f59e0b]" : words >= 30 ? "bg-[var(--gn)]" : "bg-[var(--t4)]"
              )}
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ type: "spring", bounce: 0, duration: 0.8 }}
            />
          </div>
        </div>

        {/* Example Selector */}
        <div className="mt-10 border-t border-[var(--bdA)] pt-8">
          <p className="text-[0.65rem] font-bold uppercase tracking-widest text-[var(--t3)] mb-4 flex items-center gap-2">
            <Sparkles size={12} className="text-[var(--gn)]" />
            Selection of AgriBio Breakthroughs:
          </p>
          <div className="flex gap-2 flex-wrap">
            {EXAMPLE_CHIPS.map((chip) => (
              <motion.button
                key={chip.key}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => fillExample(chip.key)}
                className="px-4 py-2 rounded-lg text-xs font-bold text-[var(--t2)] bg-white border border-[var(--bdM)] transition-all hover:border-[var(--gn)] hover:text-[var(--gn)] hover:bg-slate-50 shadow-sm"
              >
                {chip.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-8 md:p-12 pt-8 border-t border-[var(--bdM)] bg-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4 max-w-md">

          <p className="text-xs text-[var(--t3)] leading-relaxed font-medium">
            ABventures AI Lab evaluates against our Problem Clarity, Founder-Domain Fit, and Market Timing criteria. High-scoring ideas are invited to apply for funding.
          </p>
        </div>

        <button
          onClick={onScore}
          disabled={!isReady || loading}
          className={cn(
            "w-full md:w-auto h-12 px-8 rounded-xl font-bold text-white transition-all overflow-hidden relative shadow-sm",
            "bg-[var(--gn)] hover:bg-[var(--tx)] active:scale-[0.98]",
            "disabled:opacity-40 disabled:pointer-events-none group hover:shadow-md"
          )}
        >
          <span className="relative z-10 flex items-center justify-center gap-2 text-sm">
            {loading ? "Analyzing..." : "Score Idea"}
            {!loading && <Send size={16} />}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
        </button>
      </div>
    </div>
  );
}
