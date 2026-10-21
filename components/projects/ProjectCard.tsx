import Link from "next/link";
import Image from "next/image";
import Badge from "@/components/ui/Badge";
import { IconArrowRight } from "@/components/ui/Icons";
import { Projeto } from "@/types/project";

type ProjectCardProps = {
  projeto: Projeto;
  baseHref?: string; // "/investir" (padrão) ou "/ppp"
};

// Card resumido de projeto — reutilizado no Portal do Investidor E no Catálogo PPP
// (mesmo componente, os dados é que vêm filtrados por categoria em cada página).
export default function ProjectCard({ projeto, baseHref = "/investir" }: ProjectCardProps) {
  const { slug, titulo, setor, imagem } = projeto;

  return (
    <Link
      href={`${baseHref}/${slug}`}
      className="group border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-all duration-200"
    >
      <div className="relative w-full h-[180px]">
        <Image
          src={imagem}
          alt={titulo}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
        <div className="absolute bottom-3 left-3">
          <Badge variant="verde" className="bg-white/90">{setor}</Badge>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-base font-bold text-gray-900 leading-snug mb-2 line-clamp-2">
          {titulo}
        </h3>
        <span className="text-sm font-semibold text-[#1F6F4A] inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
          Ver detalhes <IconArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}