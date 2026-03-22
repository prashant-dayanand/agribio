import { Hero } from "@/components/hero/Hero";
import { IdeaScorer } from "@/components/scorer/IdeaScorer";
import { GrantsSection } from "@/components/grants/GrantsSection";
import { DaoSection } from "@/components/dao/DaoSection";
import { AILabSection } from "@/components/ailab/AILabSection";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <IdeaScorer />
        <GrantsSection />
        <DaoSection />
        <AILabSection />
      </main>
    </>
  );
}
