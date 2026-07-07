import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Impact } from "@/components/sections/impact";
import { MissionLog } from "@/components/sections/mission-log";
import { Builds } from "@/components/sections/builds";
import { Capabilities } from "@/components/sections/capabilities";
import { MoreAbout } from "@/components/sections/more-about";
import { Roadmap } from "@/components/sections/roadmap";
import { Transmission } from "@/components/sections/transmission";
import { Footer } from "@/components/sections/footer";
import { FidgetBar } from "@/components/sections/fidget-bar";
import { SectionDivider } from "@/components/ui/section-divider";
import { Marquee } from "@/components/ui/marquee";
import { CursorTrail } from "@/components/ui/cursor-trail";
import { ScrollCup } from "@/components/ui/scroll-cup";
import { BrewRain } from "@/components/ui/brew-rain";
import { Coffee, Bean, Croissant, Milk, Leaf, Sprout, Cherry } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* faint paper grain over everything */}
      <div className="pointer-events-none fixed inset-0 z-0 noise-overlay opacity-[0.04]" />

      {/* ambient toys: ink cursor trail, fill-as-you-scroll cup, "brew" easter egg */}
      <CursorTrail />
      <ScrollCup />
      <BrewRain />

      <Navbar />

      <main className="relative z-10">
        <Hero />

        <Marquee />

        <SectionDivider icon={Bean} tone="coffee" />
        <Impact />

        <SectionDivider icon={Leaf} tone="matcha" />
        <MissionLog />

        <SectionDivider icon={Milk} tone="coffee" />
        <Builds />

        <SectionDivider icon={Cherry} tone="strawberry" />
        <Capabilities />

        <SectionDivider icon={Bean} tone="coffee" />
        <FidgetBar />

        <SectionDivider icon={Croissant} tone="coffee" />
        <MoreAbout />

        <SectionDivider icon={Leaf} tone="matcha" />
        <Roadmap />

        <SectionDivider icon={Coffee} tone="coffee" />
        <Transmission />

        <Footer />
      </main>
    </>
  );
}
