"use client";

import Link from "next/link";
import Image from "next/image";
import { useId, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import type { Projeto } from "@/types/project";
import s from "./investir.module.css";

type ProjectPreview = Pick<Projeto, "slug" | "titulo" | "categoria" | "setor" | "fase" | "localizacao" | "imagem" | "resumo">;
type IconName = "leaf" | "gear" | "chart" | "map" | "file" | "people" | "box" | "arrow";
const CONTACT = "/contactos#mensagem-titulo";
// Ordem editorial: alterar estes slugs para escolher outros destaques.
const FEATURED = ["processamento-frutas-citricas", "centro-logistico-armazem", "parque-solar-fotovoltaico"];
const SECTORS = [
  {
    id: "produzir", tab: "Produzir e transformar", title: "Criar mais valor a partir da produção.",
    text: "Da produção ao processamento e à conservação, conheça actividades que pode estudar para o seu próximo projecto.",
    image: "/images/investir/producao.jpg", alt: "Produção e selecção de produtos agrícolas",
    items: ["Agricultura e agro-indústria", "Conservação e processamento", "Serviços de apoio à produção"],
    icons: ["leaf", "chart", "people"] as IconName[], sectors: ["Agricultura", "Indústria"],
  },
  {
    id: "distribuir", tab: "Armazenar e distribuir", title: "Aproximar a produção dos mercados.",
    text: "Explore possibilidades de armazenagem, conservação e distribuição, considerando as necessidades dos produtores e das empresas.",
    image: "/images/investir/logistica.jpg", alt: "Armazenagem e organização de mercadorias",
    items: ["Armazenagem e conservação", "Distribuição e comércio", "Serviços de apoio à logística"],
    icons: ["box", "chart", "people"] as IconName[], sectors: ["Comércio e Logística", "Comércio", "Infraestrutura"],
  },
  {
    id: "desenvolver", tab: "Servir e desenvolver", title: "Criar soluções para quem produz e vive aqui.",
    text: "Conheça áreas de interesse em energia, turismo e serviços e identifique onde a sua experiência pode responder a uma necessidade.",
    image: "/images/investir/servicos.jpg", alt: "Soluções de energia e serviços de apoio à produção",
    items: ["Energia e soluções para produtores", "Turismo e alojamento", "Saúde e serviços especializados"],
    icons: ["gear", "map", "people"] as IconName[], sectors: ["Energia", "Turismo", "Saúde"],
  },
];

function Icon({ name, size = 28 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <><path d="M4 12h16m-6-6 6 6-6 6" /></>,
    leaf: <><path d="M12 22V11M12 16C4 17 2 11 3 5c7 0 10 4 9 11ZM12 12C12 5 17 2 22 3c0 6-3 10-10 9ZM6 9l6 7m5-10-5 6" /></>,
    gear: <><path d="m9 3 1-2h4l1 2 3 2 3 1v4l-2 2 2 2v4l-3 1-3 2-1 2h-4l-1-2-3-2-3-1v-4l2-2-2-2V6l3-1Z" /><circle cx="12" cy="12" r="4" /></>,
    chart: <><path d="M2 21h20M4 21V12h4v9m2 0V7h4v14m2 0V3h4v18" /></>,
    map: <><path d="m2 5 6-3 8 3 6-3v17l-6 3-8-3-6 3V5Zm6-3v17m8-14v17" /></>,
    file: <><path d="M5 2h10l4 4v16H5V2Zm10 0v5h4M8 11h8m-8 4h8m-8 4h5" /></>,
    people: <><circle cx="12" cy="6" r="3" /><path d="M6 22v-6a6 6 0 0 1 12 0v6M5 4a3 3 0 0 0 0 6m14-6a3 3 0 0 1 0 6M3 13a4 4 0 0 0-2 4v5m20-9a4 4 0 0 1 2 4v5" /></>,
    box: <><path d="m3 6 9-4 9 4v13l-9 4-9-4V6Zm0 0 9 4 9-4M12 10v13M7 4l10 4v6" /></>,
  };
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function Photo({ src, alt, priority = false, sizes = "(max-width: 760px) 100vw, 50vw" }: { src: string; alt: string; priority?: boolean; sizes?: string }) {
  const [failed, setFailed] = useState(false);
  return failed ? <div className={s.photoFallback}><Icon name="leaf" size={44} /><span>Imagem em preparação</span></div> :
    <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={s.photo} onError={() => setFailed(true)} />;
}

export default function InvestirContent({ projetos }: { projetos: ProjectPreview[] }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const featured = FEATURED.map(slug => projetos.find(p => p.slug === slug)).filter((p): p is ProjectPreview => Boolean(p));


  function tabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % SECTORS.length;
    else if (event.key === "ArrowLeft") next = (index + SECTORS.length - 1) % SECTORS.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = SECTORS.length - 1;
    else return;
    event.preventDefault(); setActive(next); tabs.current[next]?.focus();
  }


  return (
    <main className={s.page}>
      <section className={s.hero} aria-labelledby="investir-title">
        <div className={s.heroImage}><Photo src="/images/investir/observatorio.jpg" alt="Paisagem agrícola e ligações rodoviárias do distrito" priority sizes="100vw" /></div>
        <div className={s.heroVeil} />
        <div className={`${s.container} ${s.heroInner}`}>
          <nav aria-label="Localização na página" className={s.breadcrumb}><Link href="/">Início</Link><span aria-hidden="true">›</span><span aria-current="page">Investir</span></nav>
          <div className={s.heroCopy}>
            <p className={s.eyebrow}>Investir em Nhamatanda</p>
            <h1 id="investir-title">O próximo passo do seu investimento pode começar aqui.</h1>
            <p className={s.intro}>Da produção à transformação, explore possibilidades de negócio e encontre o ponto de partida para o seu projecto.</p>
            <div className={s.actions}><Link className={s.primary} href={CONTACT}>Apresentar o meu projecto <Icon name="arrow" size={18} /></Link><a className={s.secondary} href="#sectores">Explorar possibilidades</a></div>
          </div>
        </div>
      </section>

      <section className={s.valueBand} aria-labelledby="valor-title"><div className={s.container}>
        <h2 id="valor-title">Um território. Diferentes formas de criar valor.</h2>
        <div className={s.values}>{[
          { icon: "leaf", title: "Produzir", text: "Explore actividades ligadas à produção local." },
          { icon: "gear", title: "Transformar", text: "Identifique possibilidades de processamento e conservação." },
          { icon: "chart", title: "Ligar aos mercados", text: "Conheça as ligações e o contexto territorial." },
        ].map(v => <div className={s.value} key={v.title}><Icon name={v.icon as IconName} size={48} /><div><h3>{v.title}</h3><p>{v.text}</p></div></div>)}</div>
      </div></section>

      <section id="sectores" className={`${s.container} ${s.section}`} aria-labelledby="sectores-title">
        <p className={s.eyebrow}>Encontre o seu ponto de partida</p>
        <h2 id="sectores-title">Onde se enquadra o seu negócio?</h2>
        <p className={s.lead}>Explore as actividades que se aproximam da sua experiência e dos seus objectivos.</p>
        <div className={s.tabs} role="tablist" aria-label="Áreas de negócio">{SECTORS.map((g, i) => <button type="button" role="tab" key={g.id} id={`${id}-tab-${i}`} aria-selected={i === active} aria-controls={`${id}-panel-${i}`} tabIndex={i === active ? 0 : -1} ref={el => { tabs.current[i] = el; }} onClick={() => setActive(i)} onKeyDown={e => tabKey(e, i)}>{g.tab}</button>)}</div>
        {SECTORS.map((g, i) => <div key={g.id} role="tabpanel" id={`${id}-panel-${i}`} aria-labelledby={`${id}-tab-${i}`} hidden={active !== i} tabIndex={0}>
          {active === i && <div className={s.sectorPanel}><div className={s.sectorPhoto}><Photo key={g.image} src={g.image} alt={g.alt} /></div><div className={s.sectorCopy}><h3>{g.title}</h3><p>{g.text}</p><ul>{g.items.map((item, n) => <li key={item}><Icon name={g.icons[n]} size={30} /><span>{item}</span></li>)}</ul><Link className={s.textLink} href={`/oportunidades?${new URLSearchParams(g.sectors.map(sector => ["setor", sector])).toString()}`}>Explorar este sector <Icon name="arrow" size={18} /></Link></div></div>}
        </div>)}
      </section>

      <section className={s.information} aria-labelledby="informacao-title"><div className={`${s.container} ${s.informationInner}`}><div><h2 id="informacao-title">Uma decisão começa<br /> com informação.</h2><p>Conheça o território, consulte os dados disponíveis e identifique o que precisa de esclarecer.</p></div><div className={s.infoLinks}>{[
        { title: "Explorar o mapa", href: "/contactos", icon: "map" },
        { title: "Consultar o Observatório", href: "/observatorio", icon: "chart" },
        { title: "Conhecer o distrito", href: "/sobre-o-distrito", icon: "file" },
      ].map(item => <Link href={item.href} key={item.title}><Icon name={item.icon as IconName} size={42} /><span>{item.title} <Icon name="arrow" size={16} /></span></Link>)}</div></div></section>

      <section id="oportunidades" className={`${s.container} ${s.section}`} aria-labelledby="oportunidades-title">
        <div className={s.sectionHeader}><div><p className={s.eyebrow}>Possibilidades a explorar</p><h2 id="oportunidades-title">Do potencial à possibilidade de negócio.</h2><p className={s.lead}>Explore áreas de interesse e peça informação para avaliar o próximo passo.</p></div><Link className={s.textLink} href="/oportunidades">Ver todas as oportunidades <Icon name="arrow" size={18} /></Link></div>
        <div id="investir-catalogue">

          <div className={s.cards}>{featured.map(p => <article className={s.card} key={p.slug}><Link href={`${p.categoria === "PPP" ? "/ppp" : "/investir"}/${p.slug}`} className={s.cardImage} tabIndex={-1} aria-hidden="true"><Photo src={p.imagem} alt="" sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw" /><span className={s.badge}>{p.setor}</span></Link><div className={s.cardBody}><h3><Link href={`${p.categoria === "PPP" ? "/ppp" : "/investir"}/${p.slug}`}>{p.titulo}</Link></h3><p>{p.resumo}</p><Link className={s.textLink} href={`${p.categoria === "PPP" ? "/ppp" : "/investir"}/${p.slug}`}>Conhecer a oportunidade <Icon name="arrow" size={16} /></Link></div></article>)}</div>
          {featured.length === 0 && <p className={s.empty} role="status">Novas oportunidades em preparação.</p>}
        </div>
        <p className={s.note}>A viabilidade e as condições de cada projecto exigem avaliação e confirmação junto das entidades responsáveis.</p>
      </section>

      <section className={`${s.container} ${s.stepsSection}`} aria-labelledby="passos-title"><h2 id="passos-title">Da sua ideia à próxima conversa.</h2><ol className={s.steps}>{[
        { title: "Partilhe o seu interesse", text: "Indique o sector e o que pretende desenvolver." },
        { title: "Apresente o contexto", text: "Descreva a localização pretendida e as necessidades do projecto." },
        { title: "Esclareça o próximo passo", text: "Peça informação sobre condições e procedimentos aplicáveis." },
      ].map((step, i) => <li key={step.title}><span className={s.number} aria-hidden="true">0{i + 1}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></li>)}</ol></section>

      <section className={s.cta} aria-labelledby="conversa-title"><div className={`${s.container} ${s.ctaInner}`}><div><h2 id="conversa-title">O seu projecto merece uma conversa.</h2><p>Tem uma ideia definida ou está a explorar possibilidades?<br />Conte-nos o que pretende desenvolver em Nhamatanda.</p></div><div className={s.ctaActions}><Link className={s.whiteButton} href={CONTACT}>Apresentar o meu projecto <Icon name="arrow" size={18} /></Link></div></div></section>
    </main>
  );
}