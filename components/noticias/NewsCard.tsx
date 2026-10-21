import Link from "next/link";
import Image from "next/image";
import { IconCalendar, IconArrowRight, IconBank } from "@/components/ui/Icons";
import { Noticia } from "@/types/noticia";
import { formatarData } from "@/lib/noticias";

type NewsCardProps = {
    noticia: Noticia;
};

// Card de notícia — imagem, categoria (texto verde), título em duas linhas,
// data com ícone de calendário. Layout alinhado com o Design System.
export default function NewsCard({ noticia }: NewsCardProps) {
    const { 
        slug,    titulo,    categoria,    data,    imagem,    resumo,    fonte,    autor,
     } = noticia;

     const origem = fonte || autor || "Governo de Nhamatanda";

    return (
        
        <Link
      href={`/noticias/${slug}`}
      className="
        group
        block
        overflow-hidden
        rounded-xl
        border
        border-[#E2E8F0]
        bg-white
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-[0_12px_35px_rgba(0,0,0,0.08)]
      "
    >

        {/* =====================================================
          IMAGEM
      ====================================================== */}
      <div className="relative w-full h-[190px] overflow-hidden">

        <Image
          src={imagem}
          alt={titulo}
          fill
          className="
            object-cover
            transition-transform
            duration-500
            group-hover:scale-105
          "
          sizes="(max-width: 1024px) 100vw, 33vw"
        />

        {/* Overlay subtil no hover */}
        <div
          className="
            absolute
            inset-0
            bg-black/0
            transition-colors
            duration-300
            group-hover:bg-black/20
          "
        />

        {/* Botão visual no hover */}
        <div
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            opacity-0
            transition-opacity
            duration-300
            group-hover:opacity-100
          "
        >
          <span
            className="
              flex
              items-center
              gap-2
              rounded-full
              bg-white
              px-4
              py-2
              text-sm
              font-semibold
              text-[#166B45]
              shadow-lg
            "
          >
            Ler notícia
            <IconArrowRight size={15} />
          </span>
        </div>
      </div>

      {/* =====================================================
          CONTEÚDO
      ====================================================== */}
      <div className="px-5 pt-4 pb-4">

        {/* CATEGORIA */}
        <div className="mb-2.5">
          <span
            className="
              inline-flex
              items-center
              rounded-md
              bg-[#E8F2EE]
              px-2.5
              py-1
              text-[11px]
              font-bold
              uppercase
              tracking-wide
              text-[#166B45]
            "
          >
            {categoria}
          </span>
        </div>

        {/* TÍTULO */}
        <h3
          className="
            text-[19px]
            font-bold
            leading-[1.25]
            text-[#0F172A]
            line-clamp-2
            transition-colors
            duration-200
            group-hover:text-[#166B45]
          "
        >
          {titulo}
        </h3>

        {/* RESUMO */}
        {resumo && (
          <p
            className="
              mt-2.5
              text-[15px]
              leading-6
              text-[#64748B]
              line-clamp-3
            "
          >
            {resumo}
          </p>
        )}

        {/* =================================================
            DATA + FONTE
        ================================================= */}
        <div
          className="
            mt-4
            flex
            items-center
            gap-2
            border-t
            border-[#E2E8F0]
            pt-3.5
            text-xs
            text-[#64748B]
          "
        >

          {/* DATA */}
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <IconCalendar size={14} />
            <span>{formatarData(data)}</span>
          </div>

          {/* SEPARADOR */}
          <span className="text-[#CBD5E1]">•</span>

          {/* FONTE */}
          <div className="flex min-w-0 items-center gap-1.5">
            <IconBank size={14} />

            <span className="truncate">
              {origem}
            </span>
          </div>
        </div>
      </div>
  </Link>
    );
}