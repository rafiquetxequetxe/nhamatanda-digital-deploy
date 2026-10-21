import Link from 'next/link';
import DistrictPhoto from './DistrictPhoto';
import { Heading, Symbol } from './DistrictUI';
import { districtLeaders, leadershipVerifiedAt, type DistrictLeader } from './district-institutional-data';
import base from './district.module.css';
import s from './district-institutional.module.css';

function Portrait({ person }: { person: DistrictLeader }) {
  return person.photo ? (
    <DistrictPhoto src={person.photo} alt={`${person.name} — ${person.role}`} sizes="(max-width: 760px) 100vw, 360px" />
  ) : (
    <div className={s.portraitFallback} aria-hidden="true"><Symbol kind="people" /></div>
  );
}

function Attribution({ person }: { person: DistrictLeader }) {
  return <p className={s.source}>Fonte: {person.sourceUrl ? <a href={person.sourceUrl}>{person.source}</a> : person.source}</p>;
}

export default function LeadershipSection() {
  const [administrator, ...team] = districtLeaders;
  return (
    <section id="lideranca" aria-labelledby="lideranca-titulo" className={`${base.section} ${base.sage}`}>
      <div className={base.container}>
        <div id="lideranca-titulo">
          <Heading eyebrow="Liderança e governação" title="Quem lidera o distrito.">
            Conheça os responsáveis pela Administração e pelos serviços distritais.
          </Heading>
        </div>

        {administrator ? (
          <>
            <article className={s.leadCard}>
              <div className={s.leadPortrait}><Portrait person={administrator} /></div>
              <div className={s.leadBody}>
                <p className={s.role}>{administrator.role}</p>
                <h3>{administrator.name}</h3>
                {administrator.description && <p className={s.biography}>{administrator.description}</p>}
                <Attribution person={administrator} />
                <Link href="/contactos" className={base.primary}>Contactar a Administração <span aria-hidden="true">↗</span></Link>
              </div>
            </article>

            {team.length > 0 && <div className={s.team}>
              {team.map(person => <article key={person.id} className={s.teamCard}>
                <div className={s.teamPortrait}><Portrait person={person} /></div>
                <div className={s.teamBody}>
                  <p className={s.role}>{person.role}</p>
                  <h3>{person.name}</h3>
                  {person.description && <p className={s.description}>{person.description}</p>}
                  <Attribution person={person} />
                </div>
              </article>)}
            </div>}
            {leadershipVerifiedAt && <p className={s.verified}>Informação confirmada em {leadershipVerifiedAt}.</p>}
          </>
        ) : (
          <div className={s.empty}>
            <p>A identificação dos responsáveis e as fotografias oficiais serão disponibilizadas após confirmação institucional.</p>
            <Link href="/contactos" className={base.textLink}>Consultar os canais de contacto <span aria-hidden="true">↗</span></Link>
          </div>
        )}
      </div>
    </section>
  );
}
