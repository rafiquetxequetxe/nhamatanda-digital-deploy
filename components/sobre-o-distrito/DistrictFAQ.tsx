import Link from 'next/link';
import { Heading } from './DistrictUI';
import s from './district.module.css';
const questions = [
  { title: 'Onde posso conhecer oportunidades de investimento?', text: 'A página Investir é o ponto de partida para consultar a informação disponível e orientar os próximos passos da sua iniciativa.', href: '/investir', label: 'Explorar oportunidades' },
  { title: 'Como avaliar as condições de uma localização?', text: 'Comece pela informação territorial. Depois confirme acessos, serviços, enquadramento do terreno e requisitos da actividade com os serviços competentes.', href: '#territorio', label: 'Explorar o território' },
  { title: 'Como contactar a Administração?', text: 'Na página Contactos pode apresentar a sua questão. Indique o sector, a localização de interesse e o tipo de informação de que necessita.', href: '/contactos', label: 'Ir para Contactos' },
];
export default function DistrictFAQ() { return <section className={`${s.section} ${s.container} ${s.faq}`}><Heading eyebrow="Perguntas frequentes" title="Antes de dar o próximo passo."/><div className={s.accordions}>{questions.map(q => <details key={q.title}><summary>{q.title}<span aria-hidden="true">+</span></summary><div><p>{q.text}</p><Link href={q.href}>{q.label} →</Link></div></details>)}</div></section>; }
