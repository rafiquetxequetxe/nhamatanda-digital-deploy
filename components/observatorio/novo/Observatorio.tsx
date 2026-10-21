"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ObservatorioChart from "./ObservatorioChart";
import { criarCSV, descarregar, intervalo, numero, preencherAnos, recortar, ultimo, urlPublicacao, variacao, type ObservatorioData, type Publicacao } from "./observatorio-model";
import s from "./observatorio.module.css";

function Icon({ name, size = 24 }: { name: string; size?: number }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    {name === "people" ? <><circle cx="9" cy="7" r="3" /><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6M18 14a5 5 0 0 1 3 5v2" /></>
      : name === "leaf" ? <><path d="M20 3C9 2 3 7 5 15s17 4 15-12ZM4 21 16 8" /></>
      : name === "road" ? <><path d="m7 3-4 18h18L17 3M12 3v3M12 10v4M12 18v3" /></>
      : name === "trade" ? <><path d="M3 11h4v10H3zM10 6h4v15h-4zM17 2h4v19h-4z" /></>
      : name === "download" ? <><path d="M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4" /></>
      : name === "arrow" ? <path d="M4 12h16m-6-6 6 6-6 6" />
      : name === "close" ? <path d="m6 6 12 12M6 18 18 6" />
      : name === "search" ? <><circle cx="10" cy="10" r="6" /><path d="m15 15 6 6" /></>
      : <><path d="M5 2h9l5 5v15H5ZM14 2v6h5M8 13h8M8 17h6" /></>}
  </svg>;
}

function ReportPreview({ report, demo, close, explore }: { report: Publicacao; demo: boolean; close: () => void; explore: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => { dialog?.close(); document.body.style.overflow = overflow; previous?.focus(); };
  }, []);
  function download() {
    const text = [demo ? "PUBLICAÇÃO DEMONSTRATIVA — NÃO OFICIAL" : "PUBLICAÇÃO", report.titulo, `${report.tipo} · ${report.ano}`, report.resumo, ...report.seccoes.flatMap(sec => [sec.titulo, sec.texto])].join("\n\n");
    descarregar(text, `${report.id}-previa.txt`, "text/plain;charset=utf-8");
  }
  return <dialog ref={ref} className={s.dialog} aria-labelledby="report-title" onCancel={event => { event.preventDefault(); close(); }}>
    <div className={s.dialogHeader}><span className={s.eyebrow}>{demo ? "Publicação demonstrativa" : report.tipo}</span><button type="button" autoFocus className={s.iconButton} onClick={close} aria-label="Fechar publicação"><Icon name="close" /></button></div>
    <h2 id="report-title">{report.titulo}</h2><p className={s.reportMeta}>{report.tipo} · {report.ano}</p><p>{report.resumo}</p>
    {report.seccoes.map((sec, i) => <section key={i}><h3>{sec.titulo}</h3><p>{sec.texto}</p></section>)}
    <div className={s.dialogActions}><button type="button" className={s.primary} onClick={explore}>Explorar indicador <Icon name="arrow" size={18} /></button><button type="button" className={s.secondary} onClick={download}>Descarregar prévia (.txt)</button></div>
  </dialog>;
}

export default function Observatorio({ data }: { data: ObservatorioData }) {
  const initial = data.indicadores.find(ind => ind.id === data.indicadorInicial) ?? data.indicadores[0];
  const [category, setCategory] = useState(initial?.categoria ?? "");
  const [indicatorId, setIndicatorId] = useState(initial?.id ?? "");
  const [period, setPeriod] = useState("5");
  const [view, setView] = useState<"grafico" | "tabela">("grafico");
  const [territoryId, setTerritoryId] = useState(data.territorio[0]?.id ?? "");
  const [query, setQuery] = useState("");
  const [preview, setPreview] = useState<Publicacao | null>(null);
  const [heroError, setHeroError] = useState(false);
  const categories = [...new Set(data.indicadores.map(ind => ind.categoria))];
  const available = data.indicadores.filter(ind => ind.categoria === category);
  const indicator = available.find(ind => ind.id === indicatorId) ?? available[0];
  const points = indicator ? preencherAnos(recortar(indicator.dados, period)) : [];
  const last = ultimo(points);
  const change = indicator ? variacao(points, indicator.unidade) : null;
  const demo = data.demonstrativo || Boolean(indicator?.demonstrativo);
  const territory = data.territorio.find(item => item.id === territoryId) ?? data.territorio[0];
  const max = territory ? Math.max(0, ...territory.areas.map(area => area.valor ?? 0)) : 0;
  const normalize = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-PT");
  const reports = data.publicacoes.filter(report => normalize(`${report.titulo} ${report.tipo} ${report.ano}`).includes(normalize(query.trim())));
  const featured = reports[0];
  const otherReports = reports.slice(1);

  function chooseCategory(value: string) { setCategory(value); setIndicatorId(data.indicadores.find(ind => ind.categoria === value)?.id ?? ""); }
  function exploreReport() {
    const target = data.indicadores.find(ind => ind.id === preview?.indicador);
    if (target) { setCategory(target.categoria); setIndicatorId(target.id); }
    setPreview(null);
    // Espera pelo fecho do diálogo e devolução do foco antes de focar a secção.
    window.setTimeout(() => { document.getElementById("evolution-title")?.focus(); document.getElementById("indicadores")?.scrollIntoView({ block: "start" }); }, 0);
  }
  function reportAction(report: Publicacao, feature = false) {
    const url = urlPublicacao(report.url);
    return url ? <a className={feature ? s.primary : s.reportOpen} href={url} target="_blank" rel="noopener noreferrer" aria-label={`Consultar ${report.titulo} (abre noutro separador)`}>{feature ? "Consultar publicação" : "Consultar"}<Icon name="arrow" size={17} /></a>
      : <button type="button" className={feature ? s.primary : s.reportOpen} onClick={() => setPreview(report)} aria-label={`Pré-visualizar ${report.titulo}`}>{feature ? "Pré-visualizar publicação" : "Prévia"}<Icon name="arrow" size={17} /></button>;
  }

  return <main className={s.page}>
    <section className={s.hero} aria-labelledby="observatorio-title">
      {!heroError && <Image src={data.hero.imagem} alt={data.hero.alt} fill priority sizes="100vw" className={s.heroImage} onError={() => setHeroError(true)} />}
      <div className={s.heroVeil} />
      <div className={`${s.container} ${s.heroContent}`}>
        <nav className={s.breadcrumb} aria-label="Localização na página"><Link href="/">Início</Link><span aria-hidden="true">›</span><span aria-current="page">Observatório</span></nav>
        <p className={s.eyebrow}>Observatório do distrito</p><h1 id="observatorio-title">{data.hero.titulo}</h1><p className={s.heroDescription}>{data.hero.descricao}</p>
        <div className={s.heroActions}><a className={s.primary} href="#indicadores">Explorar indicadores</a><a className={s.secondary} href="#publicacoes">Consultar publicações</a></div>
      </div>
    </section>

    <section className={s.valueBand} aria-labelledby="numbers-title">
  <div className={s.container}>
    <h2 id="numbers-title">Nhamatanda em números</h2>
    
    <div className={s.values}>
      {data.destaques.map(kpi => {
        const indicador = data.indicadores.find(item => item.id === kpi.indicador);
        const ponto = indicador ? ultimo(indicador.dados) : undefined;
        return (
          <div className={s.value} key={kpi.indicador}>
            <span className={s.valueIcon}><Icon name={kpi.icone} size={48} /></span>
            <div>
              <h3>{ponto ? `${numero(ponto.valor / (kpi.divisor > 0 ? kpi.divisor : 1))} ${kpi.sufixo}` : "Sem dados"}</h3>
              <p>{kpi.rotulo}</p>
              {ponto && <span className={s.valueYear}>Referência: {ponto.ano}</span>}
            </div>
          </div>
        );
      })}
    </div>
  </div>
</section>

    <div className={s.container}>
      <section className={s.section} id="indicadores" aria-labelledby="evolution-title">
        <div className={s.sectionHeading}><div><h2 id="evolution-title" tabIndex={-1}>Como está a evoluir o distrito?</h2><p>Escolha um tema e explore os indicadores disponíveis.</p></div></div>
        <div className={s.categories} role="group" aria-label="Temas dos indicadores">{categories.map(cat => <button key={cat} type="button" aria-pressed={category === cat} onClick={() => chooseCategory(cat)}>{cat}</button>)}</div>
        {indicator ? <div className={s.explorer}>
          <div className={s.chartPanel}>
            <div className={s.toolbar}>
              <label className={s.srOnly} htmlFor="observatorio-indicador">Indicador</label><select id="observatorio-indicador" value={indicator.id} onChange={e => setIndicatorId(e.target.value)}>{available.map(ind => <option key={ind.id} value={ind.id}>{ind.titulo}</option>)}</select>
              <label className={s.srOnly} htmlFor="observatorio-periodo">Período</label><select id="observatorio-periodo" value={period} onChange={e => setPeriod(e.target.value)}><option value="5">Últimos 5 anos</option><option value="3">Últimos 3 anos</option><option value="todos">Toda a série</option></select>
              <div className={s.viewToggle} role="group" aria-label="Apresentação dos dados"><button type="button" aria-pressed={view === "grafico"} onClick={() => setView("grafico")}>Gráfico</button><button type="button" aria-pressed={view === "tabela"} onClick={() => setView("tabela")}>Tabela</button></div>
              <button type="button" className={s.csvButton} disabled={!points.length} onClick={() => descarregar(criarCSV(indicator, points, demo), `${indicator.id}-${intervalo(points)}${demo ? "-demonstracao" : ""}.csv`)} aria-label="Descarregar os dados seleccionados em CSV">CSV <Icon name="download" size={15} /></button>
            </div>
            <div className={s.chartCaption}><span>{indicator.unidade}</span><span>{intervalo(points)}</span></div>
            {!last ? <p className={s.empty}>Não existem valores disponíveis neste período.</p> : view === "grafico" ? <ObservatorioChart indicador={indicator} dados={points} /> : <div className={s.dataTable} tabIndex={0} role="region" aria-label="Tabela de dados com deslocamento"><table><caption>{indicator.titulo} · {intervalo(points)}{demo ? " · Dados demonstrativos" : ""}</caption><thead><tr><th scope="col">Ano</th><th scope="col">Valor</th><th scope="col">Unidade</th></tr></thead><tbody>{points.map(point => <tr key={point.ano}><th scope="row">{point.ano}</th><td>{point.valor === null ? "Sem dados" : numero(point.valor)}</td><td>{indicator.unidade}</td></tr>)}</tbody></table></div>}
            <p className={s.source}>{demo ? "Série ilustrativa para demonstração · Não oficial" : `Fonte: ${indicator.fonte}`}</p>
          </div>
          <aside className={s.reading} aria-label="Leitura do indicador">
            <h3>O que mostram os dados</h3><p className={s.readingValue}>{last ? `${numero(last.valor >= 10000 ? last.valor / 1000 : last.valor)}${last.valor >= 10000 ? " mil" : ""}` : "—"}<span>{indicator.unidade}</span></p>
            <p className={s.readingYear}>{last ? `Último valor ${demo ? "do exemplo" : "disponível"} · ${last.ano}` : "Sem valor disponível"}</p>
            {change ? <p className={s.variation}><strong>{change.valor > 0 ? "+" : ""}{numero(change.valor)}{change.unidade === "%" ? "%" : ` ${change.unidade}`}</strong> face a {change.anoBase}</p> : <p className={s.readingYear}>Variação não calculável neste período.</p>}
            <p className={s.readingText}>{indicator.leitura}</p>
            <details key={indicator.id} className={s.methodology}><summary>Como interpretar este indicador</summary><p>{indicator.metodologia}</p><p>Fonte: {indicator.fonte}</p>{demo && <p>Os valores apresentados são fictícios.</p>}</details>
          </aside>
        </div> : <p className={s.empty}>Ainda não existem indicadores publicados.</p>}
      </section>

      <section className={s.section} aria-labelledby="territory-title">
        <div className={s.sectionHeading}><div><h2 id="territory-title">O território em perspectiva</h2><p>Compare os indicadores entre áreas do distrito.</p></div></div>
        {territory ? <div className={s.territory}>
          <div className={s.territoryIntro}><h3>Uma leitura mais próxima do território</h3><p>Explore as diferenças entre áreas e compare o indicador seleccionado de forma simples e intuitiva.</p><label className={s.srOnly} htmlFor="territory-indicator">Indicador territorial</label><select id="territory-indicator" value={territory.id} onChange={e => setTerritoryId(e.target.value)}>{data.territorio.map(item => <option key={item.id} value={item.id}>{item.titulo}</option>)}</select><p className={s.territoryNote}>{territory.nota}</p></div>
          <div className={s.territoryChart}><p className={s.demoNote}>{data.demonstrativo || territory.demonstrativo ? "Comparação ilustrativa" : territory.fonte} · {territory.ano} · {territory.unidade}</p><ul>{territory.areas.map(area => <li key={area.nome}><span className={s.areaName}>{area.nome}</span><span className={s.track} aria-hidden="true"><span style={{ width: `${area.valor !== null && max > 0 ? Math.max(0, area.valor) / max * 100 : 0}%` }} /></span><span className={s.areaValue}>{area.valor === null ? "Sem dados" : numero(area.valor, 0)}</span></li>)}</ul></div>
        </div> : <p className={s.empty}>Ainda não existem dados territoriais disponíveis.</p>}
      </section>

      <section className={s.section} id="publicacoes" aria-labelledby="reports-title">
        <div className={s.sectionHeading}><div><h2 id="reports-title">Relatórios e publicações</h2><p>Aprofunde a leitura do distrito.</p></div>{data.demonstrativo && <p className={s.demoNote}></p>}</div>
        <div className={s.reportSearch}><label className={s.srOnly} htmlFor="report-search">Pesquisar publicações</label><Icon name="search" size={17} /><input id="report-search" type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Pesquisar publicações…" /></div>
        {featured ? <div className={s.publications}>
          <article className={s.featuredReport}>
            <div className={s.reportCover} aria-hidden="true"><Icon name="document" size={26} /><span>Observatório</span><small>{data.demonstrativo || featured.demonstrativo ? "Publicação de exemplo" : featured.tipo}</small><div className={s.coverLandscape} /><span className={s.coverBrand}>Distrito de Nhamatanda</span></div>
            <div><p className={s.eyebrow}>Em destaque</p><h3>{featured.titulo}</h3><p>{featured.resumo}</p>{reportAction(featured, true)}</div>
          </article>
          {otherReports.length > 0 && <ul className={s.reportList}>{otherReports.map(report => <li key={report.id}><span className={s.reportIcon}><Icon name="document" /></span><div><h3>{report.titulo}</h3><p>{report.tipo} · {report.ano}{data.demonstrativo || report.demonstrativo ? " · Exemplo" : ""}</p></div>{reportAction(report)}</li>)}</ul>}
        </div> : <p className={s.empty} role="status">Nenhuma publicação encontrada.{query && <button type="button" className={s.textButton} onClick={() => setQuery("")}>Limpar pesquisa</button>}</p>}
      </section>

      <section className={s.cta} aria-labelledby="cta-title"><div><h2 id="cta-title">Dos dados à decisão.</h2><p>Conheça os sectores e as oportunidades que pode explorar em Nhamatanda.</p></div><div className={s.ctaActions}><Link className={s.primary} href="/oportunidades">Explorar oportunidades <Icon name="arrow" size={18} /></Link><Link href="/sobre-o-distrito">Conhecer o distrito</Link></div></section>
    
    
    </div>
    {preview && <ReportPreview key={preview.id} report={preview} demo={data.demonstrativo || preview.demonstrativo} close={() => setPreview(null)} explore={exploreReport} />}
  </main>;
}