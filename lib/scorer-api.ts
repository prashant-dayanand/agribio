import type { ScoreResult } from "./types";
import { MOCK_RESULT } from "./constants";

export async function scoreIdea(idea: string): Promise<ScoreResult> {
  try {
    const response = await fetch("/api/score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idea }),
    });

    if (!response.ok) {
      throw new Error("Failed to score idea");
    }

    const data = await response.json();
    return data as ScoreResult;
  } catch (error) {
    console.warn("Scoring API error, falling back to mock:", error);
    return MOCK_RESULT as ScoreResult;
  }
}

export function countWords(str: string): number {
  return str.trim() === "" ? 0 : str.trim().split(/\s+/).length;
}
