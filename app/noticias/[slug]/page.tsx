import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import {
  IconChevronRight,
  IconCalendar,
  IconFolder,
  IconTag,
  IconClock,
  IconArrowRight,
} from "@/components/ui/Icons";

import {
  getNoticiaBySlug,
  getAllNoticias,
  getNoticiasRelacionadas,
  formatarData,
  calcularTempoLeitura,
} from "@/lib/noticias";

import ZoomableImage from "@/components/ui/ZoomableImage";

type NoticiaPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllNoticias().map((noticia) => ({
    slug: noticia.slug,
  }));
}

export default async function NoticiaPage({
  params,
}: NoticiaPageProps) {
  const { slug } = await params;

  const noticia = getNoticiaBySlug(slug);

  if (!noticia) {
    notFound();
  }

  const tempoLeitura = calcularTempoLeitura(noticia.conteudo);

  const autor =
    noticia.autor ?? "Redação Nhamatanda Digital";

  const fonte =
    noticia.fonte ?? "Governo do Distrito de Nhamatanda";

  const relacionadas = getNoticiasRelacionadas(
    noticia.slug,
    noticia.categoria,
    3
  );

  return (
    <main className="bg-white">

      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-10">

        {/* =====================================================
            BREADCRUMB
        ====================================================== */}

        <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-8">

          <Link
            href="/"
            className="font-medium hover:text-[#1F6F4A] transition-colors"
          >
            Home
          </Link>

          <IconChevronRight size={12} />

          <Link
            href="/noticias"
            className="hover:text-[#1F6F4A] transition-colors"
          >
            Notícias
          </Link>

          <IconChevronRight size={12} />

          <span className="text-[#1F6F4A] line-clamp-1">
            {noticia.titulo}
          </span>

        </div>


        {/* =====================================================
            ESTRUTURA PRINCIPAL
        ====================================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-10 xl:gap-14">

          {/* ===================================================
              COLUNA PRINCIPAL
          ==================================================== */}

          <article>

            {/* CATEGORIA */}

            <div className="mb-4">

              <span
                className="
                  inline-flex
                  items-center
                  rounded-md
                  bg-[#E8F2EE]
                  px-3
                  py-1.5
                  text-xs
                  font-bold
                  uppercase
                  tracking-wide
                  text-[#166B45]
                "
              >
                {noticia.categoria}
              </span>

            </div>


            {/* TÍTULO */}

            <h1
              className="
                max-w-[1000px]
                text-4xl
                sm:text-5xl
                lg:text-[48px]
                font-bold
                leading-[1.08]
                tracking-[-0.02em]
                text-[#0F172A]
                mb-5
              "
            >
              {noticia.titulo}
            </h1>


            {/* METADADOS */}

            <div
              className="
                flex
                flex-wrap
                items-center
                gap-x-3
                gap-y-2
                text-sm
                text-[#64748B]
                mb-8
              "
            >

              <div className="flex items-center gap-1.5">
                <IconCalendar size={15} />
                <span>{formatarData(noticia.data)}</span>
              </div>

              <span className="text-[#CBD5E1]">
                •
              </span>

              <span>
                {autor}
              </span>

              <span className="text-[#CBD5E1]">
                •
              </span>

              <div className="flex items-center gap-1.5">
                <IconClock size={15} />
                <span>{tempoLeitura} min de leitura</span>
              </div>

            </div>


            {/* IMAGEM PRINCIPAL */}

            <div
              className="
                relative
                w-full
                h-[320px]
                sm:h-[400px]
                lg:h-[500px]
                rounded-2xl
                overflow-hidden
                bg-gray-100
                mb-8
              "
            >
              <ZoomableImage
                src={noticia.imagem}
                alt={noticia.titulo}
                sizes="(max-width: 1024px) 100vw, 70vw"
                gallery={[
                noticia.imagem,
                ...(noticia.galeria ?? []),
                ]}
              />
            </div>


            {/* =================================================
                RESUMO / LEAD
            ================================================== */}

            {noticia.resumo && (
              <div
                className="
                  border-l-4
                  border-[#1F6F4A]
                  bg-[#F5F9F7]
                  px-5
                  py-4
                  mb-8
                  rounded-r-lg
                "
              >
                <p
                  className="
                    text-lg
                    sm:text-xl
                    font-medium
                    leading-relaxed
                    text-[#334155]
                  "
                >
                  {noticia.resumo}
                </p>
              </div>
            )}


            {/* =================================================
                CONTEÚDO
            ================================================== */}

            <div
              className="
                
                space-y-5
              "
            >
              {noticia.conteudo
                .split("\n\n")
                .map((paragrafo, index) => (
                  <p
                    key={index}
                    className="
                      text-lg
                      text-[#475569]
                      leading-[1.8]
                    "
                  >
                    {paragrafo}
                  </p>
                ))}
            </div>


            {/* =================================================
                FONTE
            ================================================== */}

            <div
              className="
                max-w-[900px]
                mt-10
                pt-5
                border-t
                border-[#E2E8F0]
              "
            >

              <div className="flex items-start gap-3">

                <div
                  className="
                    shrink-0
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-[#E8F2EE]
                    text-[#166B45]
                  "
                >
                  <IconTag size={18} />
                </div>

                <div>

                  <p className="text-xs font-bold uppercase tracking-wide text-[#64748B] mb-1">
                    Fonte
                  </p>

                  {noticia.fonteUrl ? (
                    <a
                      href={noticia.fonteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        text-sm
                        font-semibold
                        text-[#166B45]
                        hover:underline
                      "
                    >
                      {fonte}
                    </a>
                  ) : (
                    <p className="text-sm font-semibold text-[#334155]">
                      {fonte}
                    </p>
                  )}

                </div>

              </div>

            </div>

          </article>


          {/* ===================================================
              SIDEBAR
          ==================================================== */}

          <aside>

            <div
              className="
                sticky
                top-24
                border
                border-[#E2E8F0]
                rounded-2xl
                bg-white
                p-6
              "
            >

              <h2 className="text-lg font-bold text-[#0F172A] mb-6">
                Detalhes da notícia
              </h2>


              <div className="space-y-6">

                {/* DATA */}

                <div className="flex items-start gap-3">

                  <span className="text-[#1F6F4A] shrink-0">
                    <IconCalendar size={24} />
                  </span>

                  <div>
                    <p className="text-sm font-bold text-[#0F172A] mb-1">
                      Data
                    </p>

                    <p className="text-sm text-[#64748B]">
                      {formatarData(noticia.data)}
                    </p>
                  </div>

                </div>


                {/* CATEGORIA */}

                <div className="flex items-start gap-3">

                  <span className="text-[#1F6F4A] shrink-0">
                    <IconFolder size={24} />
                  </span>

                  <div>
                    <p className="text-sm font-bold text-[#0F172A] mb-1">
                      Categoria
                    </p>

                    <p className="text-sm text-[#64748B]">
                      {noticia.categoria}
                    </p>
                  </div>

                </div>


                {/* AUTOR */}

                <div className="flex items-start gap-3">

                  <span className="text-[#1F6F4A] shrink-0">
                    <IconTag size={24} />
                  </span>

                  <div>
                    <p className="text-sm font-bold text-[#0F172A] mb-1">
                      Autor
                    </p>

                    <p className="text-sm text-[#64748B]">
                      {autor}
                    </p>
                  </div>

                </div>


                {/* FONTE */}

                <div className="flex items-start gap-3">

                  <span className="text-[#1F6F4A] shrink-0">
                    <IconTag size={24} />
                  </span>

                  <div className="min-w-0">

                    <p className="text-sm font-bold text-[#0F172A] mb-1">
                      Fonte
                    </p>

                    {noticia.fonteUrl ? (
                      <a
                        href={noticia.fonteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          text-sm
                          text-[#166B45]
                          font-medium
                          hover:underline
                        "
                      >
                        {fonte}
                      </a>
                    ) : (
                      <p className="text-sm text-[#64748B]">
                        {fonte}
                      </p>
                    )}

                  </div>

                </div>


                {/* LEITURA */}

                <div className="flex items-start gap-3">

                  <span className="text-[#1F6F4A] shrink-0">
                    <IconClock size={24} />
                  </span>

                  <div>

                    <p className="text-sm font-bold text-[#0F172A] mb-1">
                      Tempo de leitura
                    </p>

                    <p className="text-sm text-[#64748B]">
                      {tempoLeitura} min
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </aside>

        </div>


        {/* =====================================================
            GALERIA
        ====================================================== */}

        {noticia.galeria && noticia.galeria.length > 0 && (
  <div className="mt-10">
    <h2 className="text-xl font-bold text-gray-900 mb-4">
      Galeria de Imagens
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {noticia.galeria.map((img, index) => (
        <div
          key={img}
          className="
            relative
            w-full
            h-[220px]
            lg:h-[280px]
            rounded-lg
            overflow-hidden
            bg-gray-100
          "
        >
          <ZoomableImage
            src={img}
            alt={`${noticia.titulo} — imagem ${index + 2}`}
            sizes="(max-width: 768px) 100vw, 33vw"
            gallery={[
              noticia.imagem,
              ...(noticia.galeria ?? []),
            ]}
            initialIndex={index + 1}
          />
        </div>
      ))}
    </div>
  </div>
)}


        {/* =====================================================
            NOTÍCIAS RELACIONADAS
        ====================================================== */}

        {relacionadas.length > 0 && (

          <section className="mt-14">

            <div className="flex items-end justify-between gap-4 mb-5">

              <div>

                <p className="text-sm font-bold uppercase tracking-wide text-[#1F6F4A]">
                  CONTINUE A LER
                </p>

                <h2 className="text-2xl font-bold text-[#0F172A] mt-1">
                  Notícias relacionadas
                </h2>

              </div>

              <Link
                href={`/noticias?categoria=${encodeURIComponent(
                  noticia.categoria
                )}`}
                className="
                  hidden
                  sm:flex
                  items-center
                  gap-2
                  text-sm
                  font-semibold
                  text-[#166B45]
                  hover:text-[#0F5133]
                "
              >
                Ver todas
                <IconArrowRight size={15} />
              </Link>

            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

              {relacionadas.map((rel) => (

                <Link
                  key={rel.slug}
                  href={`/noticias/${rel.slug}`}
                  className="
                    group
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

                  {/* IMAGEM */}

                  <div className="relative w-full h-[190px] overflow-hidden">

                    <Image
                      src={rel.imagem}
                      alt={rel.titulo}
                      fill
                      className="
                        object-cover
                        transition-transform
                        duration-500
                        group-hover:scale-105
                      "
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />

                  </div>


                  {/* CONTEÚDO */}

                  <div className="p-5">

                    <span
                      className="
                        inline-flex
                        rounded-md
                        bg-[#E8F2EE]
                        px-2.5
                        py-1
                        text-[11px]
                        font-bold
                        uppercase
                        tracking-wide
                        text-[#166B45]
                        mb-3
                      "
                    >
                      {rel.categoria}
                    </span>


                    <h3
                      className="
                        text-[18px]
                        font-bold
                        leading-snug
                        text-[#0F172A]
                        line-clamp-2
                        group-hover:text-[#166B45]
                        transition-colors
                      "
                    >
                      {rel.titulo}
                    </h3>


                    <div
                      className="
                        mt-4
                        pt-3
                        border-t
                        border-[#E2E8F0]
                        flex
                        items-center
                        justify-between
                        text-xs
                        text-[#64748B]
                      "
                    >

                      <span>
                        {formatarData(rel.data)}
                      </span>

                      <span
                        className="
                          flex
                          items-center
                          gap-1
                          font-semibold
                          text-[#166B45]
                        "
                      >
                        Ler notícia
                        <IconArrowRight size={13} />
                      </span>

                    </div>

                  </div>

                </Link>

              ))}

            </div>

          </section>

        )}


        {/* =====================================================
            VOLTAR ÀS NOTÍCIAS
        ====================================================== */}

        <div className="mt-12 pt-6 border-t border-[#E2E8F0]">

          <Link
            href="/noticias"
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-semibold
              text-[#166B45]
              hover:text-[#0F5133]
              transition-colors
            "
          >
            <span className="text-lg">←</span>
            Voltar às notícias
          </Link>

        </div>

      </div>

    </main>
  );
}