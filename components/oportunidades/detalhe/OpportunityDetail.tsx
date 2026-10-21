import Link from "next/link";
import type { Projeto } from "@/types/project";
import InterestButton from "@/components/projects/InterestButton";
import OpportunityGallery from "./OpportunityGallery";
import s from "./opportunity-detail.module.css";

type Props = { projeto: Projeto; relacionados?: Projeto[] };

function texto(value: string | undefined) { return value?.trim() ?? ""; }
function paragrafos(values?: string[]) { return (values ?? []).map(value => value.trim()).filter(Boolean); }
function linkDocumento(value: string) {
  const url = value.trim();
  if (url.startsWith("/") && !url.startsWith("//") && !url.includes("\\")) return url;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:" ? url : null;
  } catch { return null; }
}
function seta() { return <span aria-hidden="true">→</span>; }

export default function OpportunityDetail({ projeto: p, relacionados = [] }: Props) {
  const modalidade = p.categoria === "PPP" ? "Parceria público-privada" : "Investimento privado";
  const modelo = texto(p.modeloInvestimento) || texto(p.tipoPPP) || texto(p.tipoInvestimento);
  const descricao = paragrafos(p.descricaoDetalhada);
  const completos = paragrafos(p.descricaoCompleta).filter(value => !descricao.includes(value));
  const documentos = (p.documentos ?? []).map(doc => ({ ...doc, href: linkDocumento(doc.url) }));
  const temDocumentos = documentos.some(doc => doc.href);
  const etapas = p.etapasProgresso ?? [];
  const beneficios = p.beneficios ?? [];
  const parceiros = p.parceiros ?? [];
  const criterios = paragrafos(p.criteriosDeAvaliacao);
  const vantagens = paragrafos(p.porQueInvestir);
  const detalhes = p.detalhesProjeto ?? [];
  const coords = p.coordenadas;
  const temCoordenadas = coords && Number.isFinite(coords.lat) && Number.isFinite(coords.lng)
    && Math.abs(coords.lat) <= 90 && Math.abs(coords.lng) <= 180;
  const localMapa = temCoordenadas ? `${coords.lat},${coords.lng}` : "";
  const facts = [
    ["Modalidade", modalidade],
    ["Modelo de participação", modelo],
    ["Localização", texto(p.localizacao) || "A confirmar"],
    ["Fase", texto(p.fase) || "A confirmar"],
    ["Investimento estimado", texto(p.investimentoEstimado)],
    ["Área indicada", texto(p.areaTerreno)],
  ].filter(([, value]) => Boolean(value));
  const additionalFacts = [
    ["Duração do contrato", texto(p.duracaoContrato)],
    ["Prazo estimado", texto(p.prazoEstimado)],
    ["Estado registado", texto(p.estado)],
    ["Lançamento previsto na ficha", texto(p.dataPrevistaLancamento)],
  ].filter(([, value]) => Boolean(value));
  const estados = {
    concluido: { label: "Concluído", mark: "✓" },
    "em-andamento": { label: "Em andamento", mark: "●" },
    pendente: { label: "Pendente", mark: "○" },
  };

  return (
    <main className={s.page}>
      <div className={s.container}>
        <nav className={s.breadcrumb} aria-label="Localização na página">
          <Link href="/">Início</Link><span aria-hidden="true">›</span>
          <Link href="/oportunidades">Oportunidades</Link><span aria-hidden="true">›</span>
          <span aria-current="page">{p.titulo}</span>
        </nav>

        <header className={s.heading}>
          <div className={s.eyebrows}><span>{p.setor}</span><span className={s.badge}>{modalidade}</span></div>
          <h1>{p.titulo}</h1>
          <p className={s.lead}>{p.resumo}</p>
          <div className={s.meta}>
            <span><svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>{texto(p.localizacao) || "Localização a confirmar"}</span>
            {texto(p.promotor) && <span>Promotor: {p.promotor}</span>}
            {texto(p.publicadoEm) && <span>Publicado em {p.publicadoEm}</span>}
          </div>
        </header>

        <div className={s.layout}>
          <div className={s.galleryArea}>
            <OpportunityGallery key={p.slug} imagemPrincipal={p.imagem} galeria={p.galeria} titulo={p.titulo} />
          </div>

          <aside className={s.sidebar} aria-labelledby="decision-title">
  <div className={s.decision} id="avaliar-oportunidade">
    <div className={s.decisionBanner}>
      <span aria-hidden="true">i</span>
      Informação essencial
    </div>

    <div className={s.decisionContent}>
      <h2 id="decision-title">Avalie esta oportunidade</h2>

      <dl className={s.facts}>
        {facts.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>
              {label === "Fase" ? (
                <span className={s.phaseBadge}>{value}</span>
              ) : (
                value
              )}
            </dd>
          </div>
        ))}
      </dl>

      <div className={s.interest}>
        <InterestButton
          projetoTitulo={p.titulo}
          projetoSlug={p.slug}
        />
      </div>

      <p className={s.smallNote}>
        Indique o seu interesse e as questões que pretende esclarecer.
      </p>

      {temDocumentos && (
        <a className={s.secondaryButton} href="#documentos">
          <svg
            aria-hidden="true"
            width="19"
            height="22"
            viewBox="0 0 24 28"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 2h9l5 5v18H5Z" />
            <path d="M14 2v6h5M8 14h8M8 18h6" />
          </svg>
          Consultar documentos
        </a>
      )}
    </div>
  </div>

  <section
    className={s.phaseCard}
    aria-labelledby="phase-title"
  >
    <h2 id="phase-title">Fase do projecto</h2>

    {etapas.length > 0 ? (
      <ol className={s.timeline}>
        {etapas.map((etapa, index) => {
          const estado = estados[etapa.estado] ?? estados.pendente;

          return (
            <li
              key={`${etapa.nome}-${index}`}
              data-state={etapa.estado}
            >
              <span
                className={s.timelineMark}
                aria-hidden="true"
              >
                {estado.mark}
              </span>

              <div>
                <h3>{etapa.nome}</h3>
                <span>{estado.label}</span>
              </div>
            </li>
          );
        })}
      </ol>
    ) : (
      <div className={s.phase}>
        <span className={s.phaseBadge}>
          {texto(p.fase) || "Fase a confirmar"}
        </span>

        {texto(p.estado) && <p>{p.estado}</p>}

        <p>As etapas detalhadas ainda não estão disponíveis.</p>
      </div>
    )}

    <p className={s.phaseFootnote}>
      Etapas apresentadas conforme a informação disponível na ficha.
    </p>
  </section>
</aside>

          <div className={s.body}>
            <nav className={s.sectionNav} aria-label="Secções da oportunidade">
              <a href="#visao-geral">Visão geral</a><a href="#participacao">Participação</a>
              <a href="#documentos">Documentos</a><a href="#localizacao">Localização</a>
            </nav>

            <section className={s.section} id="visao-geral" aria-labelledby="overview-title">
              <p className={s.kicker}>Visão geral</p>
              <h2 id="overview-title">A oportunidade</h2>
              {(descricao.length ? descricao : [p.resumo]).map((value, index) => <p key={index}>{value}</p>)}
              {completos.length > 0 && <details className={s.expand}><summary>Ler descrição completa</summary>{completos.map((value, index) => <p key={index}>{value}</p>)}</details>}
              {texto(p.potencial) && <div className={s.textBlock}><h3>Potencial do projecto</h3><p>{p.potencial}</p></div>}
              {texto(p.vantagensDoDistrito) && <div className={s.textBlock}><h3>Porque Nhamatanda</h3><p>{p.vantagensDoDistrito}</p></div>}
              {vantagens.length > 0 && <ul className={s.list}>{vantagens.map((value, i) => <li key={i}>{value}</li>)}</ul>}
              {texto(p.alinhamentoEstrategico) && <div className={s.textBlock}><h3>Alinhamento estratégico</h3><p>{p.alinhamentoEstrategico}</p></div>}
              {detalhes.length > 0 && <div className={s.detailGrid}>{detalhes.map((item, i) => <div key={i}><h3>{item.titulo}</h3><p>{item.descricao}</p></div>)}</div>}

              {beneficios.length > 0 && <div className={s.textBlock}><h3>Benefícios previstos</h3><div className={s.benefits}>{beneficios.map((item, i) => <div key={i}><span aria-hidden="true" className={s.benefitMark}>✓</span><h4>{item.titulo}</h4><p>{item.descricao}</p></div>)}</div></div>}
              {(typeof p.empregosDiretos === "number" || typeof p.empregosIndiretos === "number") && <div className={s.jobs}>
                {typeof p.empregosDiretos === "number" && <p><strong>{p.empregosDiretos.toLocaleString("pt-PT")}</strong><span>Empregos directos estimados</span></p>}
                {typeof p.empregosIndiretos === "number" && <p><strong>{p.empregosIndiretos.toLocaleString("pt-PT")}</strong><span>Empregos indirectos estimados</span></p>}
              </div>}
              {additionalFacts.length > 0 && <dl className={`${s.facts} ${s.additionalFacts}`}>{additionalFacts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>}
            </section>

            <section className={`${s.section} ${s.participation}`} id="participacao" aria-labelledby="participation-title">
              <p className={s.kicker}>Participação</p><h2 id="participation-title">Como pode participar</h2>
              {modelo && <p><strong>Modelo indicado:</strong> {modelo}</p>}
              <p>{texto(p.comoSubmeter) || "Manifeste o seu interesse para solicitar informação sobre os próximos passos deste projecto."}</p>
              {criterios.length > 0 && <><h3>Critérios indicados para avaliação</h3><ul className={s.list}>{criterios.map((value, index) => <li key={index}>{value}</li>)}</ul></>}
              <a className={s.textLink} href="#avaliar-oportunidade">Avaliar e manifestar interesse {seta()}</a>
            </section>

            
            <section className={s.section} id="documentos" aria-labelledby="documents-title">
              <p className={s.kicker}>Informação de apoio</p><h2 id="documents-title">Documentos do projecto</h2>
              {documentos.length > 0 ? <ul className={s.documents}>{documentos.map((doc, index) => <li key={`${doc.nome}-${index}`}>
                <span className={s.fileIcon} aria-hidden="true"><svg width="22" height="26" viewBox="0 0 24 28" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 2h9l5 5v18H5Z" /><path d="M14 2v6h5M8 14h8M8 18h8" /></svg></span>
                <div><h3>{doc.nome}</h3><p>{[doc.tipo, doc.tamanho].filter(Boolean).join(" · ") || "Documento do projecto"}</p></div>
                {doc.href ? <a href={doc.href} target="_blank" rel="noopener noreferrer" aria-label={`Consultar ${doc.nome} (abre noutro separador)`}>Consultar <span aria-hidden="true">↗</span></a> : <span className={s.unavailable}>Indisponível</span>}
              </li>)}</ul> : <p className={s.notice}>Ainda não existem documentos publicados para esta oportunidade. Pode solicitar esclarecimentos ao manifestar interesse.</p>}
            </section>

            {parceiros.length > 0 && <section className={s.section} aria-labelledby="partners-title"><h2 id="partners-title">Entidades e parceiros indicados</h2><div className={s.partners}>{parceiros.map((item, index) => <div key={index}><span className={s.partnerIcon} aria-hidden="true">{item.nome.trim().slice(0, 1)}</span><div><h3>{item.nome}</h3><p>{item.papel}</p>{item.estado && <span className={s.partnerState}>{item.estado}</span>}</div></div>)}</div></section>}

            <section className={s.section} id="localizacao" aria-labelledby="location-title">
              <h2 id="location-title">Localização do projecto</h2>
              <p>{texto(p.localizacao) || "Localização a confirmar"}</p>
              {temCoordenadas ? <>
                <iframe className={s.map} title={`Localização indicada de ${p.titulo}`} src={`https://www.google.com/maps?q=${encodeURIComponent(localMapa)}&z=13&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
                <a className={s.textLink} href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(localMapa)}`} target="_blank" rel="noopener noreferrer">Abrir localização no mapa <span aria-hidden="true">↗</span></a>
              </> : <div className={s.locationNote}><p>O ponto exacto de implantação ainda não está indicado nesta ficha.</p><Link className={s.textLink} href="/contactos">Consultar o mapa do distrito {seta()}</Link></div>}
            </section>
          </div>
        </div>

        <section className={s.finalCta} aria-labelledby="next-step-title"><div><p className={s.kicker}>Vamos conversar</p><h2 id="next-step-title">Quer saber como participar neste projecto?</h2><p>Manifeste o seu interesse e indique a informação de que precisa para avaliar o próximo passo.</p></div><div className={s.ctaActions}><div className={s.interest}><InterestButton projetoTitulo={p.titulo} projetoSlug={p.slug} /></div><Link href="/oportunidades">← Voltar às oportunidades</Link></div></section>

        {relacionados.length > 0 && <section className={s.related} aria-labelledby="related-title"><div className={s.relatedHeading}><h2 id="related-title">Outras oportunidades para explorar</h2><Link className={s.textLink} href="/oportunidades">Ver todas {seta()}</Link></div><div className={s.relatedGrid}>{relacionados.slice(0, 3).map(item => <Link key={item.slug} href={`${item.categoria === "PPP" ? "/ppp" : "/investir"}/${item.slug}`}><span>{item.setor}</span><h3>{item.titulo}</h3><p>{item.localizacao}</p><span className={s.textLink}>Conhecer a oportunidade {seta()}</span></Link>)}</div></section>}
      </div>
    </main>
  );
}