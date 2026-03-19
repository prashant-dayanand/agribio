// ─── SCORER TYPES ──────────────────────────────────────────────
export interface ScoreResult {
  overall: number;
  dao_chance: number;
  problem_clarity: number;
  founder_domain_fit: number;
  market_timing: number;
  verdict: "Fundable" | "Promising" | "Needs work" | "Too early";
  headline: string;
  summary: string;
  top_signals: string[];
  watch_outs: string[];
  ai_insight: string;
}

export type ScorerState = "idle" | "loading" | "result";

export interface LoadingStep {
  id: string;
  label: string;
  status: "pending" | "active" | "done";
}

// ─── GRANT TYPES ───────────────────────────────────────────────
export type GrantRegion = "india" | "global";
export type GrantStage = "seed" | "growth";
export type GrantSector = "agritech" | "biotech";

export interface GrantSectorTag {
  label: string;
  type: "agri" | "bio" | "tech" | "default";
}

export interface GrantAmount {
  value: string;
  label: string;
}

export interface GrantMetaRow {
  icon: string;
  key: string;
  value: string;
}

export interface Grant {
  id: string;
  flag: string;
  flagBg: string;
  badges: Array<{ label: string; variant: "green" | "blue" | "amber" | "default" }>;
  org: string;
  name: string;
  description: string;
  amounts: GrantAmount[];
  meta: GrantMetaRow[];
  sectors: GrantSectorTag[];
  applyUrl: string;
  applyLabel: string;
  deadline: string;
  deadlineSub: string;
  tags: Array<GrantRegion | GrantStage | GrantSector | "all">;
}

// ─── DAO TYPES ─────────────────────────────────────────────────
export interface DaoStatItem {
  icon: string;
  value: string;
  label: string;
  sub: string;
}

export interface DaoStep {
  number: string;
  icon: string;
  title: string;
  description: string;
}

export interface Proposal {
  id: string;
  title: string;
  status: "active" | "passed" | "failed";
  forPct: number;
  forCount: string;
  againstCount: string;
  timeLabel: string;
}

export interface AllocationItem {
  color: string;
  label: string;
  pct: number;
}

export interface FlywheelNode {
  icon: string;
  title: string;
  sub: string;
  colorClass: string;
}

// ─── AI LAB TYPES ──────────────────────────────────────────────
export type AILabTab = "mkt" | "sales" | "ops";

export interface Agent {
  number: string;
  icon: string;
  name: string;
  description: string;
  tagLabel: string;
  colorVariant: "green" | "blue" | "amber" | "earth";
}

export interface SysmapNode {
  icon: string;
  title: string;
  who: string;
  description: string;
  isActive?: boolean;
  isDark?: boolean;
}

export interface PipelineStep {
  number: string;
  title: string;
  description: string;
  agentLabel: string;
  agentVariant: "green" | "blue" | "amber" | "earth";
}

export interface OpsCard {
  icon: string;
  name: string;
  description: string;
  bullets: string[];
  colorVariant: "green" | "blue" | "purple" | "amber";
}

export interface MatrixRow {
  task: string;
  founder: { label: string; check: string; variant: "yes" | "no" | "recv" };
  ailab: { label: string; check: string; variant: "yes" | "no" };
  dao: { label: string; check: string; variant: "yes" | "no" };
}

export interface LiveLead {
  name: string;
  meta: string;
  count: string;
  delay: number;
}
