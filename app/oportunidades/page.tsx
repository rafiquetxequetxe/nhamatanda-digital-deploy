import Link from "next/link";
import Image from "next/image";
import { getAllProjetos } from "@/lib/projects";
import { getCatalog, PAGE_SIZE, type CatalogParams } from "@/components/oportunidades/catalog-query";
import OpportunityImage from "@/components/oportunidades/OpportunityImage";
import s from "@/components/oportunidades/oportunidades.module.css";
import AutoFilterForm from "@/components/oportunidades/AutoFilterForm";

export const metadata = { title: "Oportunidades de investimento | Distrito de Nhamatanda", description: "Explore oportunidades de investimento privado e parcerias público-privadas no distrito de Nhamatanda." };
const unique = (values: string[]) => [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b, "pt"));

function Checks({ title, name, options, selected }: { title: string; name: string; options: string[]; selected: string[] }) {
  return <fieldset className={s.fieldset}><legend>{title}</legend>{options.map(value => <label key={value} className={s.check}><input type="checkbox" name={name} value={value} defaultChecked={selected.includes(value)} /><span>{value === "PPP" ? "Parceria público-privada (PPP)" : value}</span></label>)}</fieldset>;
}

export default async function OportunidadesPage({ searchParams }: { searchParams: Promise<CatalogParams> }) {
  const params = await searchParams;
  const all = getAllProjetos();
  const c = getCatalog(all, params);
  // Preserva opções recebidas por URL, mesmo que já não existam no catálogo.
  const sectors = unique([...all.map(p => p.setor), ...c.sectors]);
  const phases = unique([...all.map(p => p.fase), ...c.phases]);
  const locations = unique([...all.map(p => p.localizacao), ...(c.location && c.location !== "Todas" ? [c.location] : [])]);
  const categories = unique(["Investimento Privado", "PPP", ...c.categories]);
  const pageNumbers = [...new Set([1, c.totalPages, c.page - 1, c.page, c.page + 1])].filter(p => p > 0 && p <= c.totalPages).sort((a, b) => a - b);

  return <main className={s.page}>
    <section className={s.hero} aria-labelledby="catalog-title">
      <Image src="/images/banners/oportunidadesHero.jpg" alt="" fill priority sizes="100vw" className={s.heroImage} />
      <div className={s.veil} />
      <div className={`${s.container} ${s.heroContent}`}><h1 id="catalog-title">Oportunidades de investimento</h1><nav aria-label="Localização na página" className={s.breadcrumb}><Link href="/">Início</Link><span aria-hidden="true">›</span><span aria-current="page">Oportunidades</span></nav><p>Encontre oportunidades que se aproximam do seu sector, dos seus objectivos e da sua forma de investir.</p></div>
    </section>

    <div className={`${s.container} ${s.content}`}>
      {/* Um único formulário conserva pesquisa, filtros e ordenação em cada aplicação. */}
      <AutoFilterForm className={s.layout}>
        <aside className={s.sidebar} aria-labelledby="filters-title"><div className={s.filterHeading}><h2 id="filters-title">Filtrar oportunidades</h2></div>
          <Checks title="Modalidade" name="categoria" options={categories} selected={c.categories} />
          <Checks title="Sector" name="setor" options={sectors} selected={c.sectors} />
          <Checks title="Fase" name="fase" options={phases} selected={c.phases} />
          {c.types.length > 0 && <Checks title="Tipo de investimento (filtro anterior)" name="tipo" options={unique([...all.flatMap(p => p.tipoInvestimento ? [p.tipoInvestimento] : []), ...c.types])} selected={c.types} />}
          <label className={s.field}>Localização<select name="localizacao" defaultValue={c.location || "Todas"}><option value="Todas">Todas as localizações</option>{locations.map(value => <option key={value}>{value}</option>)}</select></label>
          
          <button
  type="button"
  data-clear-filters
  className={s.resetFiltersButton}
>
  <svg
    aria-hidden="true"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 10a9 9 0 1 1 2.6 8.4" />
    <path d="M3 4v6h6" />
  </svg>

  Limpar filtros
</button>
        </aside>

        <section className={s.results} aria-labelledby="results-title">
          <div className={s.toolbar}><label className={s.search}>Pesquisar oportunidades<input type="search" name="q" defaultValue={c.query} placeholder="Projecto, sector ou localização" /></label><label className={s.field}>Ordenar por<select name="ordenar" defaultValue={c.order}><option value="catalogo">Ordem do catálogo</option><option value="az">Título: A–Z</option></select></label></div>
          <div className={s.resultsHeading}><h2 id="results-title">{c.count} {c.count === 1 ? "oportunidade encontrada" : "oportunidades encontradas"}</h2>{c.count > 0 && <p>{(c.page - 1) * PAGE_SIZE + 1}–{Math.min(c.page * PAGE_SIZE, c.count)} de {c.count}</p>}</div>
          {c.count === 0 ? <div className={s.empty}><h3>Nenhuma oportunidade encontrada</h3><p>Experimente outros termos ou remova alguns filtros.</p><button
  type="button"
  data-clear-filters
  className={s.clearButton}
>
  Ver todas as oportunidades →
</button></div> : <div className={s.cards}>{c.items.map(p => {
            const href = `${p.categoria === "PPP" ? "/ppp" : "/investir"}/${p.slug}`;
            return <article key={p.slug} className={s.card}><div className={s.cardImage}><OpportunityImage key={p.imagem} src={p.imagem} alt={p.titulo} /><span className={s.sector}>{p.setor}</span></div><div className={s.cardBody}><span className={s.category}>{p.categoria === "PPP" ? "Parceria público-privada" : "Investimento privado"}</span><h3><Link href={href}>{p.titulo}</Link></h3><p className={s.summary}>{p.resumo}</p><dl className={s.facts}>
  <div>
    <dt>Localização</dt>

    <dd>
      <svg
        aria-hidden="true"
        width="19"
        height="19"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>

      <span>{p.localizacao || "A confirmar"}</span>
    </dd>
  </div>

  <div>
    <dt>Fase</dt>

    <dd>
      <svg
        aria-hidden="true"
        width="19"
        height="19"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m12 2 3 2 3.5.5.5 3.5 2 4-2 3-.5 3.5-3.5.5-3 3-3-3-3.5-.5L5 15l-2-3 2-4 .5-3.5L9 4Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>

      <span>{p.fase || "A confirmar"}</span>
    </dd>
  </div>
</dl><Link className={s.details} href={href}>
  Conhecer a oportunidade

  <svg
    aria-hidden="true"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 12h16M14 6l6 6-6 6" />
  </svg>
</Link></div></article>;
          })}</div>}
          {c.totalPages > 1 && <nav className={s.pagination} aria-label="Paginação das oportunidades">{c.page > 1 && <Link href={c.href(c.page - 1)} aria-label="Página anterior">←</Link>}{pageNumbers.map((page, i) => <span key={page} className={s.pageItem}>{i > 0 && page - pageNumbers[i - 1] > 1 && <span className={s.ellipsis}>…</span>}<Link href={c.href(page)} aria-label={`Página ${page}`} aria-current={page === c.page ? "page" : undefined}>{page}</Link></span>)}{c.page < c.totalPages && <Link href={c.href(c.page + 1)} aria-label="Página seguinte">→</Link>}</nav>}
        </section>
      </AutoFilterForm>
      <section className={s.help} aria-labelledby="help-title"><div><h2 id="help-title">Tem um projecto diferente em mente?</h2><p>Partilhe a sua ideia e indique a informação de que precisa para avaliar o próximo passo.</p></div><Link href="/contactos#mensagem-titulo">Apresentar o meu projecto →</Link></section>
    </div>
  </main>;
}