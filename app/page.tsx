import Image from "../public/next.svg";
import ConsolidateSection from "./components/ConsolidateSection/page";
import TestSection from "./components/TestSection/page";

export default function Home() {
  return (
    <div className="items-center justify-items-center font-[family-name:var(--font-geist-sans)]">
  <TestSection/>
      <ConsolidateSection  />
  <TestSection/>

    </div>
  );
}
