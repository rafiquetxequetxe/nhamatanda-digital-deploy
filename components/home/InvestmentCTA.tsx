import Link from "next/link";
import { IconArrowRight } from "@/components/ui/Icons";
import s from "@/components/investir/investir.module.css";

export default function InvestmentCTA() {
  return (
    <div className={s.page}>
      <div className={s.cta}>
        <div className={`${s.container} ${s.ctaInner}`}>
          {/* Texto original */}
          <div>
            <h2>
              Tem uma ideia, projecto ou investimento
              <br className="hidden sm:block" />
              {" "}para o desenvolvimento de Nhamatanda?
            </h2>

            <p>
              Estamos disponíveis para ouvir, orientar e construir consigo
              novas oportunidades para o distrito.
            </p>
          </div>

          {/* Botão original */}
          <div className={s.ctaActions}>
            <Link className={s.whiteButton} href="/contactos">
              Fale connosco
              <IconArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}