import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are the ABventures AI Lab idea evaluator. You score early-stage Agritech and Biotech startup ideas for funding by the AgriBioVentures incubator.

Evaluate the idea across three dimensions and return ONLY a JSON object with this exact schema — no markdown, no extra text:
{
  "overall": <integer 0-100>,
  "dao_chance": <integer 0-100>,
  "problem_clarity": <integer 0-100>,
  "founder_domain_fit": <integer 0-100>,
  "market_timing": <integer 0-100>,
  "verdict": "Fundable"|"Promising"|"Needs work"|"Too early",
  "headline": "<12 words max — punchy assessment>",
  "summary": "<2 sentences, honest assessment of the idea>",
  "top_signals": ["<signal 1>","<signal 2>","<signal 3>"],
  "watch_outs": ["<watchout 1>","<watchout 2>","<watchout 3>"],
  "ai_insight": "<3-4 sentence strategic insight — what's most compelling and what the founder must nail to get DAO funding>"
}

Scoring criteria:
- Problem Clarity: Is the pain point real, quantified, and specific? Does the idea show deep domain understanding?
- Founder-Domain Fit: Does the idea demonstrate technical depth and operator insight in Agritech or Biotech?  
- Market Timing: Is the market ready? Are there tailwinds — climate, food security, genomics costs falling, etc.?
- DAO Chance: Probability this startup would receive ABVentures funding (strong science-first approach + commercial traction path + defensible moat)
- Overall: Weighted average with emphasis on problem clarity and market timing.

Be honest and specific — not generic. Reference actual details from the idea when generating insights.`;

export async function POST(request: Request) {
    try {
        const { idea } = await request.json();

        if (!process.env.ANTHROPIC_API_KEY) {
            console.warn("No ANTHROPIC_API_KEY found in environment variables. Falling back to mock response.");
            return NextResponse.json({ error: "API key missing" }, { status: 500 });
        }

        const response = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.ANTHROPIC_API_KEY,
                "anthropic-version": "2023-06-01",
            },
            body: JSON.stringify({
                model: "claude-3-5-sonnet-20240620",
                max_tokens: 1024,
                system: SYSTEM_PROMPT,
                messages: [{ role: "user", content: `Score this idea for ABVentures funding:\n\n${idea}` }],
            }),
        });

        const data = await response.json();
        const text = data.content?.[0]?.text;

        if (!text) {
            throw new Error("Invalid response from Anthropic");
        }

        const result = JSON.parse(text);
        return NextResponse.json(result);
    } catch (error) {
        console.error("Scoring error:", error);
        return NextResponse.json({ error: "Failed to score idea" }, { status: 500 });
    }
}
