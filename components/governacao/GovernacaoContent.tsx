"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MISSIONS } from "@/lib/missoes";
import { Icon } from "@/components/governacao/Icon";
import s from "./governacao.module.css";

const PRINCIPLES = [
  { icon: "target", title: "Prioridades claras", text: "Foco no que pode produzir maior impacto." },
  { icon: "gear", title: "Execução responsável", text: "Gestão orientada a resultados." },
  { icon: "handshake", title: "Parcerias", text: "Governo, comunidades e sector privado." },
  { icon: "chart", title: "Prestação de contas", text: "Acompanhar e comunicar o progresso." },
] as const;

const STEPS = [
  { icon: "people", title: "Ouvir", text: "Compreender as prioridades reais." },
  { icon: "target", title: "Priorizar", text: "Concentrar recursos onde geram impacto." },
  { icon: "handshake", title: "Mobilizar", text: "Unir capacidade pública e parcerias." },
  { icon: "gear", title: "Executar", text: "Transformar planos em acções no terreno." },
  { icon: "chart", title: "Prestar contas", text: "Medir resultados e comunicar avanços." },
] as const;

function Photo({ src, alt, priority = false, sizes = "(max-width: 760px) 100vw, 60vw" }: { src: string; alt: string; priority?: boolean; sizes?: string }) {
  const [failed, setFailed] = useState(false);
  return failed ? <div className={s.photoFallback}><Icon name="leaf" size={46} /><span>Imagem em preparação</span></div> : <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={s.photo} onError={() => setFailed(true)} />;
}

export default function GovernacaoContent() {
  return (
    <main className={s.page}>
      <section className={s.hero} aria-labelledby="governacao-title">
        <div className={s.heroImage}><Photo src="/images/investir/hero.jpg" alt="Paisagem do território e ligações do Distrito de Nhamatanda" priority sizes="100vw" /></div>
        <div className={s.heroVeil} />

        <div className={`${s.container} ${s.heroInner}`}>
          <nav className={s.breadcrumb} aria-label="Localização na página"><Link href="/">Início</Link><span aria-hidden="true">›</span><span aria-current="page">Governação</span></nav>

          <div className={s.heroCopy}>
            <p className={s.eyebrow}>Plano de Governação e prioridades</p>
            <h1 id="governacao-title">Visão do Administrador</h1>
            <blockquote className={s.quote}><span aria-hidden="true">“</span><p>Um Nhamatanda mais produtivo, inclusivo e resiliente, com mais oportunidades para as pessoas e resultados que melhoram a vida das nossas comunidades.</p></blockquote>
            <p className={s.attribution}>Manuel Moreno Teixeira Jardim</p>
            <div className={s.actions}><a className={s.primary} href="#missoes">Conhecer as 8 missões <Icon name="arrow" size={18} /></a><Link className={s.secondary} href="/oportunidades">Explorar oportunidades</Link></div>
          </div>

          <div className={s.heroStatement}><span /><strong>Liderar com visão.</strong><strong>Desenvolver com foco.</strong></div>
        </div>
      </section>

      <section className={s.principles} aria-label="Princípios de governação"><div className={`${s.container} ${s.principlesGrid}`}>{PRINCIPLES.map(item => <article key={item.title} className={s.principle}><div className={s.principleIcon}><Icon name={item.icon} size={31} /></div><div><h2>{item.title}</h2><p>{item.text}</p></div></article>)}</div></section>

      <section className={`${s.container} ${s.vision}`} aria-labelledby="visao-title">
        <div className={s.visionCopy}><p className={s.eyebrow}>Direcção estratégica</p><h2 id="visao-title">A visão para Nhamatanda</h2><p className={s.visionLead}>Construir um distrito próspero, inclusivo e resiliente, que valoriza as pessoas, aproveita o seu posicionamento estratégico, atrai investimento responsável e transforma o seu potencial em melhores oportunidades e qualidade de vida.</p></div>
        <aside className={s.meaning} aria-labelledby="significa-title"><h3 id="significa-title">O que isto significa</h3><ul><li><Icon name="chart" size={25} /><span>Um ambiente mais claro e preparado para investir.</span></li><li><Icon name="people" size={25} /><span>Mais e melhores serviços para as comunidades.</span></li><li><Icon name="leaf" size={25} /><span>Uma economia local mais forte, produtiva e geradora de emprego.</span></li></ul></aside>
      </section>

      <section id="missoes" className={`${s.container} ${s.missionsSection}`} aria-labelledby="missoes-title">
        <div className={s.sectionIntro}><p className={s.eyebrow}>Compromissos de governação</p><h2 id="missoes-title">As 8 missões para transformar Nhamatanda</h2><p>Oito prioridades que orientam programas, investimentos, parcerias e acompanhamento de resultados.</p></div>
<div className={s.missions}>
  {MISSIONS.map(mission => (
<Link href={`/governacao/${mission.slug}`} className={s.mission} key={mission.number}>      
<div className={`${s.missionIcon} ${s[mission.tone]}`}><Icon name={mission.icon} size={34} /></div>
      <div className={s.missionBody}>
        <span className={s.missionNumber}>{mission.number}</span>
        <h3>{mission.title}</h3>
        <p>{mission.text}</p>
        <span className={`${s.tag} ${s[mission.tone]}`}>{mission.label}</span>
      </div>
    </Link>
  ))}
</div>      </section>

      <section className={s.results} aria-labelledby="resultados-title"><div className={s.container}><div className={s.resultsHeading}><p className={s.eyebrow}>Da visão à execução</p><h2 id="resultados-title">Como transformamos visão em resultados</h2><p>Um processo simples para concentrar prioridades, mobilizar parceiros e acompanhar aquilo que realmente muda no território.</p></div><ol className={s.steps}>{STEPS.map((step,index) => <li key={step.title}><div className={s.stepTop}><span className={s.stepNumber}>0{index+1}</span><span className={s.stepIcon}><Icon name={step.icon} size={28} /></span>{index<STEPS.length-1 && <span className={s.stepLine} aria-hidden="true" />}</div><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol></div></section>

      <section className={`${s.container} ${s.investorMessage}`} aria-labelledby="investidor-title"><div className={s.investorAccent}><Icon name="handshake" size={42} /></div><div><p className={s.eyebrow}>Parcerias para resultados</p><h2 id="investidor-title">Mensagem aos investidores e parceiros</h2><p>Nhamatanda está aberto a parcerias sérias e de longo prazo. Trabalhamos para apresentar prioridades mais claras, oportunidades melhor estruturadas e um ambiente de diálogo que transforme investimento em valor para as pessoas, para as empresas e para o distrito.</p></div><Link className={s.investorLink} href="/oportunidades">Ver oportunidades <Icon name="arrow" size={18} /></Link></section>

      <section className={s.cta} aria-labelledby="cta-title"><div className={`${s.container} ${s.ctaInner}`}><div><h2 id="cta-title">Conheça as prioridades. Explore as oportunidades.</h2><p>Invista num distrito com visão, foco e abertura para construir parcerias.</p></div><div className={s.ctaActions}><Link className={s.whiteButton} href="/oportunidades">Explorar oportunidades <Icon name="arrow" size={18} /></Link><Link className={s.outlineButton} href="/contactos#mensagem-titulo">Falar com a Administração</Link></div></div></section>
    </main>
  );
}
