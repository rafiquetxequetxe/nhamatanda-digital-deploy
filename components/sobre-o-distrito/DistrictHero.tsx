import Link from "next/link";
import DistrictPhoto from "./DistrictPhoto";
import { photos } from "./district-content";
import { Arrow } from "./DistrictUI";
import s from "@/components/investir/investir.module.css";

export default function DistrictHero() {
  return (
    <div className={s.page}>
      <section className={s.hero} aria-labelledby="district-title">
        <div className={s.heroImage}><DistrictPhoto {...photos.hero} priority sizes="100vw" /></div>
        <div className={s.heroVeil} />
        <div className={`${s.container} ${s.heroInner}`}>
          <nav aria-label="Localização na página" className={s.breadcrumb}><Link href="/">Início</Link><span aria-hidden="true">›</span><span aria-current="page">Sobre o Distrito</span></nav>
          <div className={s.heroCopy}>
            <p className={s.eyebrow}>Sobre o distrito</p>
            <h1 id="district-title">Território que liga produção e mercados.</h1>
            <p className={s.intro}>Conheça o território, explore o seu potencial e descubra caminhos para investir.</p>
            <div className={s.actions}>
              <Link className={s.primary} href="/investir">Explorar oportunidades <Arrow /></Link>
              <a className={s.secondary} href="#territorio">Conhecer o território <span aria-hidden="true">↓</span></a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}