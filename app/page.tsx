import HeroCarousel from "@/components/home/HeroCarousel";
import HomeStats from "@/components/home/HomeStats";
import AboutDistrict from "@/components/home/AboutDistrict";
import TransformationSection from "@/components/home/TransformationSection";
import ServicesSection from "@/components/home/ServicesSection";
import EconomicObservatory from "@/components/home/EconomicObservatory";

import PartnersSection from "@/components/home/PartnersSection";
import InvestmentCTA from "@/components/home/InvestmentCTA";
import LatestNewsSection from "@/components/home/LatestNewsSection";
import FeaturedOpportunities from "@/components/home/FeaturedOpportunities";




const heroSlides = [
  {
    imagem: "/images/sliders/governacao.png",
    eyebrow: "CORREDOR DE DESENVOLVIMENTO DA BEIRA",
    titulo: "Nhamatanda no coração\ndo Corredor da Beira",
    subtitulo:
    "Onde localização, produção e conectividade se transformam em oportunidades.",
    subtitulo2:
    "Estrategicamente situado entre o Porto da Beira e o hinterland da África Austral, Nhamatanda conecta investidores aos mercados regionais.",
    botao: {
    texto: "Conhecer o Distrito",
    href: "/sobre-o-distrito"
    }
    
  },
  {
    imagem: "/images/sliders/corredor.png",
    eyebrow: "POTENCIAL PRODUTIVO",
    titulo: "Terra e água para\nproduzir e transformar",
    subtitulo:
    "Uma base agrícola com recursos e espaço para desenvolver novas cadeias de valor.",
    subtitulo2:
    "Nhamatanda reúne terras férteis e recursos hídricos com potencial para agricultura comercial, irrigação, agro-processamento e produção.",
    botao: {
    texto: "Conhecer o Distrito",
    href: "/sobre-o-distrito"
    }
  },
  {
    imagem: "/images/sliders/potenciall.jpg",
    eyebrow: "OPORTUNIDADES DE INVESTIMENTO",
    titulo: "Produzir. Processar.\nArmazenar. Transportar.",
    subtitulo:
    "Transforme o potencial de Nhamatanda em negócios, emprego e valor para a região.",
    subtitulo2:
    "Agro-indústria, logística, pecuária, água, energia, turismo e processamento oferecem oportunidades para investir e criar valor local.",
    botao: {
    texto: "Conhecer o Distrito",
    href: "/sobre-o-distrito"
    }
  },
];

export default function HomePage() {
  return (
    <div>
      {/* HERO E COROUSEL */}
      <HeroCarousel slides={heroSlides} />

      {/* ===== Secção: Estatísticas do Distrito ===== */}
      <HomeStats />

      {/* ===== Secção: Sobre o Distrito ===== */}
      <AboutDistrict />   

      {/* ===== Secção: Transformação do Distrito ===== */}
      <TransformationSection />

      {/* ===== Secção: Serviços e Oportunidades ===== */}
      <ServicesSection />

      {/* ===== Secção: Ultimas Notícias ===== */}
      <LatestNewsSection />

      {/* ===== Secção: Oportunidades + Observatório ===== */}
      <section className="bg-white pt-0 pb-12 lg:pb-14">
        <div className="max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-16">

           <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-8">

              {/* OPORTUNIDADES */}
              <FeaturedOpportunities />

              {/* OBSERVATÓRIO */}
              <EconomicObservatory />

           </div>

        </div>
      </section>

      {/* ===== Secção: Parceiros e Apoiadores ===== */}
      <PartnersSection />

      {/* ===== Secção: Call to Action para Investimento ===== */}
      <InvestmentCTA />

      

      {/* Espaço antes do Footer */}
      <div className="-mt-4" />
    </div>
  );
}