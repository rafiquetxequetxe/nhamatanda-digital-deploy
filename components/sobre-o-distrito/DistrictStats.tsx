import { Symbol } from "./DistrictUI";
import s from "./district.module.css";

const items = [
  { kind: "location" as const, title: "Sofala", text: "Enquadramento regional", href: "#territorio" },
  { kind: "road" as const, title: "Território", text: "Geografia e ligações", href: "#territorio" },
  { kind: "people" as const, title: "Comunidades", text: "Pessoas e identidade local", href: "#historia" },
  { kind: "leaf" as const, title: "Produção", text: "Perfil e potencial económico", href: "#potencial" },
];

export default function DistrictStats() {
  return (
    <section className={s.summary} aria-labelledby="sintese-titulo">
      <div className={s.summaryContainer}>
        <h2 id="sintese-titulo">Nhamatanda em síntese</h2>
        <div className={s.stats}>
          {items.map(item => (
            <a href={item.href} key={item.title}>
              <Symbol kind={item.kind} />
              <div><h3>{item.title}</h3><p>{item.text}</p></div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}