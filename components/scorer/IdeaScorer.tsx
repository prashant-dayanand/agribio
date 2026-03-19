"use client";

import { useState, useCallback } from "react";
import { SectionHeader } from "../shared/SectionHeader";
import { Badge } from "../shared/Badge";
import { ScorerInput } from "./ScorerInput";
import { ScorerLoading } from "./ScorerLoading";
import { ScorerResult } from "./ScorerResult";
import { LOADING_STEPS, MOCK_RESULT } from "../../lib/constants";
import { scoreIdea } from "../../lib/scorer-api";
import type { ScoreResult, ScorerState, LoadingStep } from "../../lib/types";
import { motion, AnimatePresence } from "framer-motion";

export function IdeaScorer() {
  const [idea, setIdea] = useState("");
  const [state, setState] = useState<ScorerState>("idle");
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [steps, setSteps] = useState<LoadingStep[]>(LOADING_STEPS);

  const animateSteps = useCallback(() => {
    let si = 0;
    const timer = setInterval(() => {
      setSteps((prev) =>
        prev.map((s, i) => {
          if (i === si - 1) return { ...s, status: "done" };
          if (i === si) return { ...s, status: "active" };
          return s;
        })
      );
      si++;
      if (si > LOADING_STEPS.length) clearInterval(timer);
    }, 900);
    return timer;
  }, []);

  const handleScore = useCallback(async () => {
    if (!idea.trim()) return;
    setState("loading");
    setSteps(LOADING_STEPS.map((s) => ({ ...s, status: "pending" })));

    const timer = animateSteps();

    try {
      const scored = await scoreIdea(idea);
      clearInterval(timer);
      setSteps(LOADING_STEPS.map((s) => ({ ...s, status: "done" })));
      await new Promise((r) => setTimeout(r, 400));
      setResult(scored);
      setState("result");
    } catch {
      clearInterval(timer);
      setResult(MOCK_RESULT as ScoreResult);
      setState("result");
    }
  }, [idea, animateSteps]);

  const handleReset = useCallback(() => {
    setState("idle");
    setIdea("");
    setResult(null);
    setSteps(LOADING_STEPS.map((s) => ({ ...s, status: "pending" })));
  }, []);

  return (
    <section id="idea-scorer" className="section-py relative overflow-hidden bg-white border-t border-[var(--bdA)]">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-slate-50 opacity-50 pointer-events-none" />

      <div className="section-max max-w-[1020px] relative z-10">
        {/* Header */}
        <div className="mb-12">
          <SectionHeader
            eyebrow="ABventures AI Lab · Idea Evaluator"
            title={<>Got an idea? <span className="text-gn-gradient italic font-medium font-sans">Score it now.</span></>}
            lead="Early-stage Agritech and Biotech founders: bypass the traditional analyst queue. Our Evaluator uses ABventures scientific data to score your breakthrough in seconds."
            center
          />
        </div>

        {/* Scorer Card - Premium & Flat Aesthetic */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border border-[var(--bdM)] rounded-3xl shadow-sm hover:shadow-md transition-shadow overflow-hidden relative"
        >
          {/* Subtle accent border */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--gn)] via-[var(--ea)] to-[var(--gn)] opacity-80" />

          <AnimatePresence mode="wait">
            {state === "idle" && (
              <motion.div
                key="input"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ScorerInput
                  value={idea}
                  onChange={setIdea}
                  onScore={handleScore}
                  loading={false}
                />
              </motion.div>
            )}
            {state === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ScorerLoading steps={steps} />
              </motion.div>
            )}
            {state === "result" && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ScorerResult result={result} onReset={handleReset} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
