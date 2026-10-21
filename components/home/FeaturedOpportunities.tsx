import OpportunitiesCarousel from "@/components/home/OpportunitiesCarousel";
import { IconArrowRight } from "../ui/Icons";
import Link from "next/link";

const oportunidadesDestaque = [
  {
    slug: "eco-lodge",
    imagem: "/images/img5.png",
    categoria: "Turismo",
    titulo: "Eco-lodge na Serra de Zembe",
    local: "Zembem",
  },
  {
    slug: "irrigacao-nhamatanda",
    imagem: "/images/img6.png",
    categoria: "Agricultura",
    titulo: "Projecto de Irrigação de Nhamatanda",
    local: "Sede do Distrito",
  },
  {
    slug: "processamento-frutas-citricas",
    imagem: "/images/img7.png",
    categoria: "Agroindústria",
    titulo: "Unidade de Processamento de Frutas Cítricas",
    local: "Sede do Distrito",
  },
  {
    slug: "eco-lodge-zembe",
    imagem: "/images/img8.png",
    categoria: "Turismo",
    titulo: "Eco-lodge na Serra de Zembe",
    local: "Zembe",
  },
];

export default function FeaturedOpportunities() {
  return (
    <div className="w-full min-w-0">

      {/* Cabeçalho */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-lg font-bold text-[#1F6F4A] tracking-wide">
            OPORTUNIDADES EM DESTAQUE
          </p>

          <p className="text-sm text-gray-500 mt-1 leading-relaxed">
            Oportunidades que podem transformar o potencial de
            Nhamatanda em desenvolvimento.
          </p>
        </div>

        <Link
          href="/investir"
          className="shrink-0 mt-1 text-sm font-semibold text-[#1F6F4A] inline-flex items-center gap-1"
        >
          Ver todas as oportunidades
          <IconArrowRight size={14} />
        </Link>
      </div>

      {/* Conteúdo */}
      <OpportunitiesCarousel
        oportunidades={oportunidadesDestaque}
      />

    </div>
  );
}