import DistrictPhoto from './DistrictPhoto';
import { photos } from './district-content';
import { Heading, Symbol } from './DistrictUI';
import s from './district.module.css';
const items = [
  ['Acessos e transportes', 'Analise os percursos e as ligações relevantes para pessoas, abastecimento e escoamento da produção.'],
  ['Água e energia', 'Identifique as necessidades da actividade e confirme a disponibilidade e a capacidade dos serviços no local.'],
  ['Comunicações', 'Avalie a conectividade necessária para a operação e confirme a cobertura com os prestadores.'],
  ['Serviços e equipamentos', 'Conheça o enquadramento dos serviços, equipamentos e apoios necessários à equipa e à actividade.'],
];
export default function DistrictInfrastructure() { return <section id="infraestruturas" className={`${s.section} ${s.sage}`}><div className={`${s.container} ${s.split}`}>
  <figure className={s.infrastructurePhoto}><DistrictPhoto {...photos.infrastructure}/><figcaption>Ligações que ajudam a compreender o território.</figcaption></figure>
  <div><Heading eyebrow="Infraestruturas e serviços" title="Condições para operar.">Uma decisão de localização começa por conhecer as condições concretas de funcionamento.</Heading><ul className={s.infrastructureList}>{items.map(([title, text]) => <li key={title}><Symbol kind="road"/><div><h3>{title}</h3><p>{text}</p></div></li>)}</ul><a href="#territorio" className={s.textLink}>Consultar informação territorial <span aria-hidden="true">↑</span></a></div>
</div></section>; }
