"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { IconMapPin, IconChevronLeft, IconChevronRight } from "@/components/ui/Icons";
import { Projeto } from "@/types/project";

type RelatedProjectsProps = {
  projetos: Projeto[];
};

// Carrossel de projetos relacionados — mesmo padrão de scroll nativo
// já usado em OpportunitiesCarousel.tsx na Home.
export default function RelatedProjects({ projetos }: RelatedProjectsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!projetos || projetos.length === 0) return null;

  function scroll(direcao: "esquerda" | "direita") {
    if (!scrollRef.current) return;
    const largura = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: direcao === "direita" ? largura : -largura,
      behavior: "smooth",
    });
  }

  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold text-gray-900 mb-5"><strong>Projetos Relacionados</strong></h2>

      <div className="relative">
        <button
          onClick={() => scroll("esquerda")}
          aria-label="Anterior"
          className="absolute left-0 top-1/3 -translate-y-1/2 -translate-x-4 z-10 w-9 h-9 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-600 hover:text-[#1F6F4A] transition-colors"
        >
          <IconChevronLeft size={18} />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {projetos.map(({ slug, imagem, setor, titulo, localizacao, tipoInvestimento }) => (
            <Link
              key={slug}
              href={`/investir/${slug}`}
              className="shrink-0 w-[270px] border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-all duration-200"
            >
              <div className="relative w-full h-[140px]">
                <Image src={imagem} alt={titulo} fill className="object-cover" sizes="270px" />
              </div>
              <div className="p-4">
                <p className="text-sm font-bold text-[#1F6F4A] uppercase tracking-wide mb-1.5">
                  {setor}
                </p>
                <h3 className="text-sm font-bold text-gray-900 leading-snug mb-2 line-clamp-2">
                  {titulo}
                </h3>
                <p className="text-xs text-gray-500 flex items-center gap-1 mb-1">
                  <IconMapPin size={12} />
                  {localizacao}, Sofala
                </p>
                {tipoInvestimento && (
                  <p className="text-xs text-[#1F6F4A] font-medium">{tipoInvestimento}</p>
                )}
              </div>
            </Link>
          ))}
        </div>

        <button
          onClick={() => scroll("direita")}
          aria-label="Seguinte"
          className="absolute right-0 top-1/3 -translate-y-1/2 translate-x-4 z-10 w-9 h-9 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-600 hover:text-[#1F6F4A] transition-colors"
        >
          <IconChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}