import Link from 'next/link';
import DistrictPhoto from './DistrictPhoto';
import { photos } from './district-content';
import { Heading, Arrow } from './DistrictUI';
import s from './district.module.css';
const sectors = [
  { title: 'Agricultura e agroindústria', text: 'Da produção à conservação e transformação: conheça as actividades que podem acrescentar valor à economia local.', photo: photos.agriculture },
  { title: 'Logística e comércio', text: 'Explore o papel das ligações regionais, da distribuição e dos serviços de apoio às actividades produtivas.', photo: photos.logistics },
  { title: 'Turismo e serviços', text: 'Descubra possibilidades ligadas à paisagem, à identidade local e aos serviços para residentes e visitantes.', photo: photos.tourism },
];
export default function EconomicPotential() { return <section id="potencial" className={`${s.section} ${s.container}`}>
  <Heading eyebrow="Potencial económico" title="Da produção às oportunidades.">Conheça áreas de actividade que ajudam a orientar a exploração do distrito. A viabilidade de cada iniciativa depende das condições do local e do projecto.</Heading>
  <div className={s.sectorGrid}>{sectors.map(item => <article key={item.title} className={s.sector}><div className={s.sectorPhoto}><DistrictPhoto {...item.photo} sizes="(max-width: 760px) 100vw, 33vw" /></div><div className={s.sectorBody}><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div>
  <div className={s.sectionEnd}><Link href="/investir" className={s.primary}>Explorar oportunidades de investimento <Arrow /></Link></div>
</section>; }
