"use client";

import { MATRIX_ROWS } from "../../lib/constants";
import { SectionHeader } from "./SectionHeader";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";
import {
    CheckCircle2, Users, Cpu, Landmark,
    ArrowRight, ShieldCheck, Sparkles
} from "lucide-react";

export function MatrixSection() {
    return (
        <section id="matrix" className="section-py bg-white border-t border-[var(--bd)] relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-lush opacity-10 blur-[120px] pointer-events-none" />

            <div className="section-max relative z-10">
                {/* Header */}
                <div className="mb-12">
                    <SectionHeader
                        eyebrow="Division of Labor"
                        title={<>Focus on science. We handle the <span className="text-gn-gradient italic font-medium font-sans">heavy lifting.</span></>}
                        lead="ABventures AI Lab is designed so founders spend zero hours on marketing, sales pipelines, or administrative overhead. The lab runs while you innovate."
                        center
                    />
                </div>

                {/* Matrix Table - Professional UI */}
                <div className="bg-white border border-[var(--bdM)] rounded-2xl overflow-hidden shadow-sm relative group">
                    <div className="absolute inset-0 bg-gradient-to-b from-[var(--bgA)]/30 to-transparent pointer-events-none" />

                    {/* Header Row */}
                    <div className="hidden md:grid grid-cols-[2fr,1fr,1.4fr,1fr] bg-[#fdfdfc] border-b border-[var(--bdM)] text-[0.7rem] font-bold uppercase tracking-widest text-[var(--t3)] relative z-10">
                        <div className="px-5 py-4 border-r border-[var(--bdM)]">Operational Area</div>
                        <div className="px-5 py-4 border-r border-[var(--bdM)] flex items-center justify-center gap-2"><Users size={14} /> Founder</div>
                        <div className="px-5 py-4 border-r border-[var(--bdM)] flex items-center justify-center gap-2 text-[var(--gn)] bg-[var(--gn)]/5"><Cpu size={14} /> ABV AI Lab</div>
                        <div className="px-5 py-4 flex items-center justify-center gap-2 text-blue-600"><Landmark size={14} /> ABV DAO</div>
                    </div>

                    {/* Rows */}
                    <div className="divide-y divide-[var(--bdM)] relative z-10">
                        {MATRIX_ROWS.map((row, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="grid grid-cols-1 md:grid-cols-[2fr,1fr,1.4fr,1fr] group transition-all hover:bg-white hover:scale-[1.002] hover:shadow-lg"
                            >
                                <div className="px-5 py-4 flex items-center border-r border-[var(--bdM)] bg-[var(--bgA)]/30 group-hover:bg-transparent transition-colors">
                                    <p className="font-semibold text-sm md:text-base text-[var(--tx)]">{row.task}</p>
                                </div>

                                {/* Founder Cell */}
                                <div className="px-5 py-3 md:py-4 flex md:flex-col items-center justify-between md:justify-center border-t md:border-t-0 border-[var(--bdM)] border-r">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className={cn(
                                            "w-6 h-6 rounded flex items-center justify-center shadow-sm",
                                            row.founder.variant === "yes" ? "bg-[var(--gn)]" : "bg-white border border-[var(--bdM)]"
                                        )}>
                                            {row.founder.variant === "yes" && <CheckCircle2 size={12} className="text-white" />}
                                        </div>
                                        <span className="text-[0.65rem] font-bold text-[var(--t3)] uppercase tracking-widest">{row.founder.label}</span>
                                    </div>
                                </div>

                                {/* AI Lab Cell */}
                                <div className="px-5 py-3 md:py-4 flex md:flex-col items-center justify-between md:justify-center bg-[var(--gn)]/5 border-t md:border-t-0 border-[var(--bdM)] border-r group-hover:bg-[var(--gn)]/10 transition-colors">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className={cn(
                                            "w-7 h-7 rounded flex items-center justify-center shadow-sm",
                                            row.ailab.variant === "yes" ? "bg-[var(--gn)]" : "bg-white border border-[var(--bdM)]"
                                        )}>
                                            {row.ailab.variant === "yes" && <CheckCircle2 size={14} className="text-white" />}
                                        </div>
                                        <span className="text-[0.7rem] font-bold text-[var(--gn)] uppercase tracking-widest">{row.ailab.label}</span>
                                    </div>
                                </div>

                                {/* DAO Cell */}
                                <div className="px-5 py-3 md:py-4 flex md:flex-col items-center justify-between md:justify-center border-t md:border-t-0 border-[var(--bdM)]">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className={cn(
                                            "w-6 h-6 rounded flex items-center justify-center shadow-sm",
                                            row.dao.variant === "yes" ? "bg-blue-500" : "bg-white border border-[var(--bdM)]"
                                        )}>
                                            {row.dao.variant === "yes" && <CheckCircle2 size={12} className="text-white" />}
                                        </div>
                                        <span className="text-[0.65rem] font-bold text-[var(--t3)] uppercase tracking-widest">{row.dao.label}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Footer Note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-12 flex justify-center"
                >
                    <div className="bg-white border border-[var(--bdM)] rounded-full px-8 py-4 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-sm font-bold text-[var(--tx)] shadow-sm">
                        <div className="flex items-center gap-2">
                            <Sparkles size={16} className="text-[var(--gn)]" />
                            <span className="uppercase tracking-widest text-xs">Autonomous Execution</span>
                        </div>
                        <div className="hidden sm:block w-px h-6 bg-[var(--bdM)]" />
                        <div className="flex items-center gap-2">
                            <ShieldCheck size={16} className="text-blue-500" />
                            <span className="uppercase tracking-widest text-xs">Verified by ABV-DAO</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
