import DistrictHero from "@/components/sobre-o-distrito/DistrictHero";
import DistrictStats from "@/components/sobre-o-distrito/DistrictStats";
import WhyNhamatanda from "@/components/sobre-o-distrito/WhyNhamatanda";
import TerritoryExplorer from "@/components/sobre-o-distrito/TerritoryExplorer";
import EconomicPotential from "@/components/sobre-o-distrito/EconomicPotential";
import DistrictInfrastructure from "@/components/sobre-o-distrito/DistrictInfrastructure";
import DistrictGallery from "@/components/sobre-o-distrito/DistrictGallery";
import DistrictStory from "@/components/sobre-o-distrito/DistrictStory";
import DistrictFAQ from "@/components/sobre-o-distrito/DistrictFAQ";
import DistrictCTA from "@/components/sobre-o-distrito/DistrictCTA";
import s from '@/components/sobre-o-distrito/district.module.css';
import DistrictTimeline from "@/components/sobre-o-distrito/DistrictTimeline";
import LeadershipSection from "@/components/sobre-o-distrito/LeadershipSection";

export default function SobrePage() {
  return <main className={s.page}>
    <DistrictHero />
    <DistrictStats />
    <WhyNhamatanda />
    <TerritoryExplorer />
    <EconomicPotential />
    <DistrictInfrastructure />
    <DistrictGallery />
    <DistrictStory />
    <DistrictTimeline />
    <LeadershipSection />
    <DistrictFAQ />
    <DistrictCTA />
  </main>;
}
