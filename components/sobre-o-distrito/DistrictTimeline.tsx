import { historicalMilestones } from './district-institutional-data';
import { Heading } from './DistrictUI';
import base from './district.module.css';
import s from './district-institutional.module.css';

export default function DistrictTimeline() {
  return (
    <section id="linha-do-tempo" aria-labelledby="cronologia-titulo" className={`${base.section} ${base.container}`}>
      <div id="cronologia-titulo">
        <Heading eyebrow="Memória do território" title="Uma história que nos trouxe até aqui.">
          Os acontecimentos que ajudam a compreender a evolução de Nhamatanda e a sua identidade.
        </Heading>
      </div>

      {historicalMilestones.length > 0 ? (
        <ol className={s.timeline}>
          {historicalMilestones.map((milestone) => (
            <li key={milestone.id} className={s.milestone}>
              <span className={s.dot} aria-hidden="true" />
              <p className={s.date}>{milestone.date}</p>
              <h3>{milestone.title}</h3>
              <p className={s.description}>{milestone.description}</p>
              <p className={s.source}>
                Fonte: {milestone.sourceUrl ? (
                  <a href={milestone.sourceUrl}>{milestone.source}</a>
                ) : milestone.source}
              </p>
            </li>
          ))}
        </ol>
      ) : (
        <p className={s.empty}>A cronologia histórica será disponibilizada após validação das datas e dos acontecimentos junto das fontes institucionais.</p>
      )}
    </section>
  );
}
