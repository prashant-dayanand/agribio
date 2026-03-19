"use client";

import { cn } from "../../lib/utils";

type BadgeVariant = "green" | "blue" | "amber" | "purple" | "default" | "dark";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  dot?: boolean;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  green: "bg-[var(--gbg)] text-[var(--gn)] border border-[var(--gbr)] px-5",
  blue: "bg-[var(--bbg)] text-[var(--bl)] border border-[var(--bbr)]",
  amber: "bg-[var(--abg)] text-[var(--am)] border border-[var(--abr)]",
  purple: "bg-[var(--hbg)] text-[var(--hash)] border border-[var(--hbr)]",
  default: "bg-[var(--bgA)] text-[var(--t2)] border border-[var(--bd)]",
  dark: "bg-[rgba(255,255,255,.08)] text-[rgba(255,255,255,.7)] border border-[rgba(255,255,255,.15)]",
};

const dotColors: Record<BadgeVariant, string> = {
  green: "bg-[var(--g3)]",
  blue: "bg-[var(--bl)]",
  amber: "bg-[var(--am)]",
  purple: "bg-[var(--hash)]",
  default: "bg-[var(--t4)]",
  dark: "bg-[rgba(255,255,255,.6)]",
};

export function Badge({ children, variant = "default", dot = false, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-[5px] px-[20px] py-[3px] rounded-full font-['DM_Mono',monospace] text-[0.6rem] font-bold tracking-[.08em] uppercase leading-[1.7] whitespace-nowrap",
        variantStyles[variant],
        className
      )}
    >
      {dot && (
        <span
          className={cn("inline-block w-[5px] h-[5px] rounded-full flex-shrink-0 dot-blink", dotColors[variant])}
        />
      )}
      {children}
    </span>
  );
}
