import { getNoticiasDestaque } from "@/lib/noticias";
import NewsCard from "@/components/noticias/NewsCard";
import { IconArrowRight } from "@/components/ui/Icons";
import Link from "next/link";

const noticiasDestaque = getNoticiasDestaque(3);

export default function LatestNewsSection() {
  return (
    <section className="bg-white pt-0 pb-12 lg:pb-14">
      <div className="max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-16">
       
        {/* =====================================================
            CABEÇALHO
        ====================================================== */}

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5">

          <div>

            <p className="text-lg font-bold text-[#1F6F4A] tracking-wide">
              NOTÍCIAS E DESTAQUES
            </p>

            <p className="text-[#64748B] text-sm lg:text-base leading-tight">
              Actualidade, iniciativas e acontecimentos que marcam Nhamatanda.
            </p>

          </div>


          {/* LINK PARA TODAS AS NOTÍCIAS */}

          <Link
            href="/noticias"
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-medium
              text-[#166B45]
              hover:text-[#0F5133]
              transition-colors
            "
          >
            Ver todas as notícias
            <IconArrowRight size={15} />
          </Link>

        </div>

        {/* NOTÍCIAS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {noticiasDestaque.map((noticia) => (
            <NewsCard
              key={noticia.slug}
              noticia={noticia}
            />
          ))}

        </div>

      </div>
    </section>
  );
}