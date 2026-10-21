import Link from "next/link";
import { Arrow } from "./DistrictUI";
import s from "@/components/investir/investir.module.css";

export default function DistrictCTA() {
  return (
    <div className={s.page}>
      <section className={s.cta} aria-labelledby="district-cta-title">
        <div className={`${s.container} ${s.ctaInner}`}>
          {/* Texto */}
          <div>
            <span
              style={{
                display: "block",
                marginBottom: "12px",
                color: "#edf5ef",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
              }}
            >
              O próximo passo começa aqui
            </span>

            <h2 id="district-cta-title">
              Conheça o território.
              <br />
              Explore as possibilidades.
            </h2>

            <p>
              Encontre informação para dar forma à sua ideia e inicie
              uma conversa sobre o seu projecto.
            </p>
          </div>

          {/* Acções */}
          <div className={s.ctaActions}>
            <Link href="/investir" className={s.whiteButton}>
              Explorar oportunidades
              <Arrow />
            </Link>

            <Link href="/contactos">
              Fale connosco
              <span
                aria-hidden="true"
                style={{
                  display: "inline-flex",
                  marginLeft: "8px",
                  verticalAlign: "middle",
                }}
              >
                <Arrow />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}