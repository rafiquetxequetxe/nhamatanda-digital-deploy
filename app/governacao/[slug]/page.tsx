import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllSlugs,
  getProgramaBySlug,
  getProgramasRelacionados,
} from "@/lib/programas";
import { getMissionBySlug } from "@/lib/missoes";
import { Icon } from "@/components/governacao/Icon";
import s from "./missao.module.css";
import { Photo} from "@/components/governacao/Photo";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const programa = getProgramaBySlug(slug);
  if (!programa) return {};
  return {
    title: `${programa.nome} — ${programa.tituloMissaoPagina ?? programa.missao}`,
    description: programa.resumo,
  };
}

export default async function MissaoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const programa = getProgramaBySlug(slug);
  if (!programa) notFound();

  const mission = getMissionBySlug(slug);
  const tone = mission?.tone ?? "green";
  const relacionados = getProgramasRelacionados(programa);

  return (
    <main className={s.page}>
      <section className={`${s.hero} ${s[tone]}`}>
        <div className={s.heroImage}>
          <Photo
            src={`/images/governacao/${slug}/hero.jpg`}
            alt={`${programa.nome} — ${programa.tituloMissaoPagina ?? programa.missao}`}
            priority
          />
        </div>
        <div className={s.heroVeil} />
        <div className={s.container}>
          <nav className={s.breadcrumb} aria-label="Localização na página">
            <Link href="/">Início</Link>
            <span aria-hidden="true">›</span>
            <Link href="/governacao">Governação</Link>
            <span aria-hidden="true">›</span>
            <span aria-current="page">{programa.nome}</span>
          </nav>

          <div className={s.heroTop}>
            {mission && (
              <div className={`${s.heroIcon} ${s[tone]}`}>
                <Icon name={mission.icon} size={38} />
              </div>
            )}
            <div>
              <p className={s.eyebrow}>
                {programa.numeroMissao
                  ? `Missão ${String(programa.numeroMissao).padStart(2, "0")} · ${programa.tituloMissaoPagina}`
                  : programa.missao}
              </p>
              <h1>{programa.nome}</h1>
            </div>
          </div>

          <p className={s.assinatura}>{programa.assinatura}</p>
          <p className={s.resumo}>{programa.resumo}</p>

          <div className={s.meta}>
            <span className={s.badge}>{programa.tipo}</span>
            <span className={s.badge}>{programa.estado}</span>
            <span className={s.badge}>{programa.prioridade}</span>
          </div>
        </div>
      </section>

      <section className={s.container}>
        <div className={s.visionBlock}>
          <Icon name="target" size={30} />
          <div>
            <h2>Visão</h2>
            <p>{programa.visao}</p>
          </div>
        </div>
      </section>

      <section className={s.container}>
        <h2><Icon name="chart" size={22} /> O problema</h2>
        <p>{programa.problema.descricao}</p>
        <h3>O que o diagnóstico precisa de responder</h3>
        <div className={s.pillGrid}>
          {programa.problema.questoesDiagnostico.map((q) => (
            <span key={q} className={s.pill}>{q}</span>
          ))}
        </div>
      </section>

      <section className={`${s.container} ${s.solucaoSection}`}>
        <h2><Icon name="gear" size={22} /> A solução</h2>
        <p>{programa.solucao.descricao}</p>
        <div className={s.frentes}>
          {programa.solucao.frentes.map((f, i) => (
            <div key={f} className={`${s.frente} ${s[tone]}`}>
              <span className={s.frenteNumero}>{String(i + 1).padStart(2, "0")}</span>
              <span>{f}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={s.container}>
        <h2><Icon name="check" size={22} /> Objetivos</h2>
        <ul className={s.checkList}>
          {programa.objetivos.map((o) => (
            <li key={o}><Icon name="check" size={16} /><span>{o}</span></li>
          ))}
        </ul>
      </section>

      <section className={s.container}>
        <h2><Icon name="people" size={22} /> Beneficiários</h2>
        <div className={s.twoCol}>
          <div className={s.beneficiarioCard}>
            <h3>Diretos</h3>
            <ul>{programa.beneficiarios.diretos.map((b) => <li key={b}>{b}</li>)}</ul>
          </div>
          <div className={s.beneficiarioCard}>
            <h3>Indiretos</h3>
            <ul>{programa.beneficiarios.indiretos.map((b) => <li key={b}>{b}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className={`${s.container} ${s.impactoSection} ${s[tone]}`}>
        <h2>Impacto esperado</h2>
        <div className={s.impactoGrid}>
          {programa.impactoEsperado.map((i) => (
            <div key={i} className={s.impactoCard}>{i}</div>
          ))}
        </div>
      </section>

      <section className={s.container}>
        <h2>Indicadores a acompanhar</h2>
        <div className={s.pillGrid}>
          {programa.indicadores.map((i) => (
            <span key={i} className={`${s.pill} ${s.pillGhost}`}>{i}</span>
          ))}
        </div>
      </section>

      <section className={s.container}>
        <h2>Parceiros procurados</h2>
        <div className={s.parceiros}>
          {programa.parceirosProcurados.map((grupo) => (
            <div key={grupo.tipo} className={s.parceiroGrupo}>
              <h3>{grupo.tipo}</h3>
              <ul>{grupo.perfis.map((perfil) => <li key={perfil}>{perfil}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>

      {relacionados.length > 0 && (
        <section className={s.container}>
          <h2>Projetos relacionados</h2>
          <div className={s.relacionados}>
            {relacionados.map((rel) => {
              const relInfo = programa.projetosRelacionados.find((p) => p.slug === rel.slug);
              const relMission = getMissionBySlug(rel.slug);
              return (
                <Link key={rel.slug} href={`/governacao/${rel.slug}`} className={s.relacionadoCard}>
                  <div className={`${s.relacionadoIcon} ${s[relMission?.tone ?? "green"]}`}>
                    {relMission ? <Icon name={relMission.icon} size={20} /> : <Icon name="map" size={20} />}
                  </div>
                  <div>
                    <strong>{rel.nome}</strong>
                    <span>{relInfo?.relacao}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <section className={`${s.container} ${s.ctaSection} ${s[tone]}`}>
        <h2>{programa.cta}</h2>
        <Link href="/contactos#mensagem-titulo" className={s.ctaButton}>
          Falar com a Administração <Icon name="arrow" size={18} />
        </Link>
      </section>
    </main>
  );
}