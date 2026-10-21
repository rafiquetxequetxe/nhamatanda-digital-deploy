"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { IconMapPin, IconArrowRight, IconChevronLeft, IconChevronRight } from "@/components/ui/Icons";

type Oportunidade = {
  slug: string;
  imagem: string;
  categoria: string;
  titulo: string;
  local: string;
};

type OpportunitiesCarouselProps = {
  oportunidades: Oportunidade[];
};

// Carrossel horizontal com scroll suave, navegado por setas.
// Usa scroll nativo do browser (overflow-x-auto) em vez de reinventar
// lógica de posição — mais leve e acessível que animar manualmente.
export default function OpportunitiesCarousel({ oportunidades }: OpportunitiesCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(direcao: "esquerda" | "direita") {
    if (!scrollRef.current) return;
    const largura = scrollRef.current.clientWidth * 0.8; // avança ~80% da largura visível
    scrollRef.current.scrollBy({
      left: direcao === "direita" ? largura : -largura,
      behavior: "smooth",
    });
  }

  return (
    <div className="relative">
      {/* Seta esquerda */}
      <button
        onClick={() => scroll("esquerda")}
        aria-label="Anterior"
        className="absolute left-0 top-1/3 -translate-y-1/2 -translate-x-4 z-10 w-9 h-9 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-600 hover:text-[#1F6F4A] transition-colors"
      >
        <IconChevronLeft size={18} />
      </button>

      {/* Faixa de cards com scroll horizontal */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {oportunidades.map(({ slug, imagem, categoria, titulo, local }) => (
          <Link
            key={slug}
            href={`/investir/${slug}`}
            className="shrink-0 w-[240px] border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-all duration-200"
          >
            <div className="relative w-full h-[130px]">
              <Image src={imagem} alt={titulo} fill className="object-cover" sizes="240px" />
              <div className="absolute bottom-2 left-2">
                <Badge variant="verde" className="bg-white/90">{categoria}</Badge>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-md font-bold text-gray-900 mb-1.5 leading-snug">{titulo}</h3>
              <p className="text-xs text-gray-500 flex items-center gap-1 mb-3">
                <IconMapPin size={12} />
                {local}
              </p>
              <span className="text-md font-semibold text-[#1F6F4A] inline-flex items-center gap-1">
                Ver detalhes <IconArrowRight size={12} />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Seta direita */}
      <button
        onClick={() => scroll("direita")}
        aria-label="Seguinte"
        className="absolute right-0 top-1/3 -translate-y-1/2 translate-x-4 z-10 w-9 h-9 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-600 hover:text-[#1F6F4A] transition-colors"
      >
        <IconChevronRight size={18} />
      </button>
    </div>
  );
}