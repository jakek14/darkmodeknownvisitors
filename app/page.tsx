import BentoGridSection from "../components/sections/bento-grid/default";
import Footer from "../components/sections/footer/default";
import Hero from "../components/sections/hero/default";
import Items from "../components/sections/items/default";
import Logos from "../components/sections/logos/default";
import TimelineSection from "../components/sections/timeline/default";
import DarkModeLogo from "../components/logos/darkmode-logo";
import Navbar from "../components/sections/navbar/default";

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-background text-foreground">
      <Navbar
        logo={
          <DarkModeLogo className="h-12 w-auto" />
        }
      />
      <div className="pt-16 md:pt-20">
        <Hero />
      </div>
      <Logos />
      <TimelineSection />
      <Items />
      <BentoGridSection />
      <Footer />
    </main>
  );
}
