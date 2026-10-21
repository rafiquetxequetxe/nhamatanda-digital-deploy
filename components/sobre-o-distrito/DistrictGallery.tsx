import DistrictPhoto from './DistrictPhoto';
import { photos } from './district-content';
import { Heading } from './DistrictUI';
import s from './district.module.css';
export default function DistrictGallery() { return <section id="galeria" className={`${s.section} ${s.container}`}>
  <Heading eyebrow="Paisagem, produção e comunidade" title="Conhecer Nhamatanda.">Uma aproximação ao território através dos seus lugares e das suas actividades.</Heading>
  <div className={s.gallery}>{[{ photo: photos.tourism, caption: 'Paisagem e território' }, { photo: photos.agriculture, caption: 'Produção e economia local' }, { photo: photos.community, caption: 'Pessoas e comunidade' }].map(({ photo, caption }) => <figure key={caption}><div><DistrictPhoto {...photo} sizes="(max-width: 760px) 100vw, 40vw" /></div><figcaption>{caption}</figcaption></figure>)}</div>
</section>; }
