"use client";

import { Badge } from "./Badge";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, FileText, ShieldCheck } from "lucide-react";

export function FocusBreak() {
  return (
    <section className="section-py relative overflow-hidden bg-[var(--tx)] text-white text-center border-t border-white/5">
      {/* Immersive background visuals */}
      <div className="absolute inset-0 bg-lush opacity-10 blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 hero-grid opacity-5 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--gn)]/10 blur-[140px] pointer-events-none" />

      <div className="section-max relative z-10 py-10 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="flex items-center gap-3 px-8 py-1 glass rounded-full">
            <ShieldCheck size={18} className="text-[var(--gn)]" />
            <span className="text-[0.55rem] font-bold tracking-[0.4em] uppercase text-black font-sans">
              Protocol Ver. 2.4.0
            </span>
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold tracking-tight leading-[1.02] mb-8 max-w-[1400px] mx-auto"
        >
          One rule for every <br />
          <span className="text-gn-gradient italic font-medium font-sans">AgriBio founder.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-lg text-white/50 max-w-[900px] mx-auto mb-14 leading-relaxed font-bold font-sans italic"
        >
          You open the lab every morning. ABventures AI Lab opens the pipeline. Decentralised funding handles the treasury. Science wins. Always.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-8 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-4 px-8 py-4 rounded-full bg-white text-[var(--tx)] text-[1rem] font-bold shadow-2xl shadow-white/5 hover:bg-white/95 transition-all"
          >
            Start My Application
            <ArrowRight size={24} className="text-[var(--gn)]" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-4 px-8 py-4 rounded-full border border-white/10 text-white/60 text-[1rem] font-bold hover:bg-white/5 transition-all hover:text-white"
          >
            Read Protocol Whitepaper
            <FileText size={22} className="opacity-40" />
          </motion.button>
        </motion.div>

        {/* Global Stats bar - Subtle footer */}

      </div>
    </section>
  );
}
