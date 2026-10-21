import Link from "next/link";
import Image from "next/image";
import NewsCard from "@/components/noticias/NewsCard";
import NoticiasSidebar from "@/components/noticias/NoticiasSidebar";
import Pagination from "@/components/ui/Pagination";
import { getAllNoticias, getCategoriasNoticias } from "@/lib/noticias";
import s from "@/components/oportunidades/oportunidades.module.css";

const POR_PAGINA = 6;

type NoticiasPageProps = {
  searchParams: Promise<{ categoria?: string; q?: string; pagina?: string }>;
};

export default async function NoticiasPage({ searchParams }: NoticiasPageProps) {
  const { categoria, q, pagina } = await searchParams;

  const categoriaAtiva = categoria ?? "Todas";
  const termoPesquisa = q ?? "";
  const paginaAtual = Math.max(1, parseInt(pagina ?? "1", 10) || 1);

  let noticias = getAllNoticias();

  if (categoriaAtiva !== "Todas") {
    noticias = noticias.filter((n) => n.categoria === categoriaAtiva);
  }
  if (termoPesquisa.trim()) {
    noticias = noticias.filter((n) =>
      n.titulo.toLowerCase().includes(termoPesquisa.toLowerCase())
    );
  }

  const totalPaginas = Math.ceil(noticias.length / POR_PAGINA);
  const noticiasPaginadas = noticias.slice(
    (paginaAtual - 1) * POR_PAGINA,
    paginaAtual * POR_PAGINA
  );

  const categorias = getCategoriasNoticias();

  // Reconstrói a base da URL de paginação, preservando os filtros ativos
  const paramsBase = new URLSearchParams();
  if (categoriaAtiva !== "Todas") paramsBase.set("categoria", categoriaAtiva);
  if (termoPesquisa) paramsBase.set("q", termoPesquisa);
  const baseUrl = `/noticias${paramsBase.toString() ? `?${paramsBase.toString()}` : ""}`;

  return (
    <div>


      {/* ===== Hero ===== */}
      <section className={s.hero} aria-labelledby="catalog-title">
      <Image src="/images/banners/noticiasHero.jpg" alt="" fill priority sizes="100vw" className={s.heroImage} />
      <div className={s.veil} />
      <div className={`${s.container} ${s.heroContent}`}><h1 id="catalog-title">Notícias do distrito</h1><nav aria-label="Localização na página" className={s.breadcrumb}><Link href="/">Início</Link><span aria-hidden="true">›</span><span aria-current="page">Notícias</span></nav><p>Acompanhe as iniciativas, os acontecimentos e os projectos que marcam o desenvolvimento de Nhamatanda.</p></div>
    </section>

    



      {/* ===== Sidebar + Grid ===== */}
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <NoticiasSidebar
            categorias={categorias}
            categoriaAtiva={categoriaAtiva}
            termoPesquisa={termoPesquisa}
          />

          <div className="flex-1">
            {noticiasPaginadas.length === 0 ? (
              <p className="text-sm text-gray-500">Nenhuma notícia encontrada.</p>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {noticiasPaginadas.map((noticia) => (
                    <NewsCard key={noticia.slug} noticia={noticia} />
                  ))}
                </div>
                <Pagination
                  totalPaginas={totalPaginas}
                  paginaAtual={paginaAtual}
                  baseUrl={baseUrl}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}