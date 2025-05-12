import Image from "../public/next.svg";
import ConsolidateSection from "./components/ConsolidateSection/page";
import TestSection from "./components/TestSection/page";
import GenerativeAIVisual from "./components/custom ai/generative-ai-visual";
export default function Home() {
  return (
    <div className="items-center justify-items-center p-8 font-[family-name:var(--font-geist-sans)]">
  <TestSection/>
      <ConsolidateSection  />
  <TestSection/>
<GenerativeAIVisual/>
    </div>
  );
}
