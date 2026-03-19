import { Topbar } from "@/components/topbar/Topbar";
import { Hero } from "@/components/hero/Hero";
import { IdeaScorer } from "@/components/scorer/IdeaScorer";
import { GrantsSection } from "@/components/grants/GrantsSection";
import { DaoSection } from "@/components/dao/DaoSection";
import { AILabSection } from "@/components/ailab/AILabSection";
import { FocusBreak } from "@/components/shared/FocusBreak";
import { MatrixSection } from "@/components/shared/MatrixSection";
import { Footer } from "@/components/shared/Footer";

export default function Home() {
  return (
    <>
      <Topbar />
      <main>
        <Hero />
        <IdeaScorer />
        {/* <MatrixSection /> */}
        <GrantsSection />
        <DaoSection />
        <AILabSection />
        <FocusBreak />
      </main>
      <Footer />
    </>
  );
}
