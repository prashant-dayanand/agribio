"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, CircleDashed, Fingerprint, Microscope, BrainCircuit } from "lucide-react";
import type { LoadingStep } from "../../lib/types";
import { cn } from "../../lib/utils";

interface ScorerLoadingProps {
  steps: LoadingStep[];
}

export function ScorerLoading({ steps }: ScorerLoadingProps) {
  return (
    <div className="px-10 py-20 text-center flex flex-col items-center justify-center bg-lush min-h-[500px]">
      {/* Premium Scanner Visual */}
      <div className="relative mb-14">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 rounded-full border-2 border-dashed border-[var(--gn)]/30 p-2"
        >
          <div className="w-full h-full rounded-full border-2 border-dashed border-[var(--gn)]/60 p-2" />
        </motion.div>

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-[var(--gn)]"
          >
            <BrainCircuit size={40} />
          </motion.div>
        </div>

        {/* Scanning Line */}
        <motion.div
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[-20px] right-[-20px] h-px bg-gradient-to-r from-transparent via-[var(--gn)] to-transparent z-20"
        />
      </div>

      <h3 className="text-[1.8rem] font-bold text-gradient mb-3">
        ABventures AI Lab <span className="text-gn-gradient italic font-normal font-sans">is analyzing...</span>
      </h3>
      <p className="text-[1.05rem] text-[var(--t3)] font-medium mb-12 max-w-[400px]">
        Cross-referencing breakthrough potential with Global Batch 4 funding mandates.
      </p>

      {/* Steps List */}
      <div className="grid grid-cols-1 gap-4 w-full max-w-[420px]">
        {steps.map((step, idx) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={cn(
              "flex items-center gap-5 p-5 rounded-2xl border transition-all duration-500",
              step.status === "active"
                ? "bg-white border-[var(--gn)] shadow-xl shadow-[var(--gn)]/10 glow-gn"
                : step.status === "done"
                  ? "bg-white border-[var(--bdM)] opacity-60"
                  : "bg-transparent border-transparent opacity-30"
            )}
          >
            <div className="flex-shrink-0">
              {step.status === "done" ? (
                <CheckCircle2 size={22} className="text-[var(--gn)]" />
              ) : step.status === "active" ? (
                <Loader2 size={22} className="text-[var(--gn)] animate-spin" />
              ) : (
                <CircleDashed size={22} className="text-[var(--t3)]" />
              )}
            </div>

            <div className="text-left">
              <p className={cn(
                "text-[0.95rem] font-bold leading-none mb-1",
                step.status === "active" ? "text-[var(--tx)]" : "text-[var(--t2)]"
              )}>
                {step.label}
              </p>
              {step.status === "active" && (
                <p className="text-[0.7rem] font-bold text-[var(--gn)] uppercase tracking-widest animate-pulse">
                  Processing Data Point...
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
