import NhamatandaMap from '@/components/mapas/NhamatandaMapWrapper';
import { Heading } from './DistrictUI';
import s from './district.module.css';
export default function TerritoryExplorer() { return <section id="territorio" className={`${s.section} ${s.sage}`}>
  <div className={`${s.container} ${s.mapLayout}`}><div><Heading eyebrow="Território e localização" title="Um território ligado à região.">Explore Nhamatanda no contexto de Sofala e das ligações ao Corredor da Beira.</Heading><p className={s.body}>O mapa permite conhecer o distrito e os postos administrativos. Abra «Camadas» para consultar outras dimensões do território ou amplie para ecrã inteiro.</p><a href="#mapa-distrito" className={s.textLink}>Explorar o mapa <span aria-hidden="true">↓</span></a><div className={s.contextNote}><strong>Uma leitura regional</strong><p>Porto da Beira, território distrital e mercados do interior: referências para estudar as ligações de cada projecto.</p></div></div>
  <div id="mapa-distrito" tabIndex={0} aria-label="Mapa interactivo do distrito" className={s.mapFrame}><NhamatandaMap /></div></div>
</section>; }
