import DistrictPhoto from './DistrictPhoto';
import { photos } from './district-content';
import { Heading } from './DistrictUI';
import s from './district.module.css';
const reasons = [
  ['Localização e ligações', 'A ligação ao Corredor da Beira ajuda a compreender a relação do distrito com os centros de produção, comércio e mercados regionais.'],
  ['Produção e transformação', 'A agricultura e as actividades associadas abrem caminhos para explorar cadeias de valor, conservação e transformação de produtos.'],
  ['Pessoas e actividade local', 'Conhecer os produtores, os negócios e as comunidades é o primeiro passo para construir parcerias ligadas à realidade do território.'],
];
export default function WhyNhamatanda() { return <section className={`${s.container} ${s.section} ${s.split}`}>
  <div><Heading eyebrow="Razões para conhecer" title="Porquê Nhamatanda?">Um ponto de partida para compreender o que o território pode oferecer ao seu projecto.</Heading>
  <ol className={s.reasons}>{reasons.map(([title, text], i) => <li key={title}><span aria-hidden="true">0{i + 1}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol></div>
  <figure className={s.portrait}><DistrictPhoto {...photos.people}/><figcaption>O território começa nas pessoas.</figcaption></figure>
</section>; }
