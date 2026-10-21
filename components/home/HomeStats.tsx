import { IconUsers, IconLeaf, IconDroplet, IconRoad } from "@/components/ui/Icons";
import s from "./home-intro.module.css";

const estatisticas = [
  { Icon: IconUsers, valor: "362.887", label: "População projectada", detalhe: "2026" },
  { Icon: IconLeaf, valor: "134.630,82 ha", label: "Terras férteis para", detalhe: "agricultura" },
  { Icon: IconDroplet, valor: "73.895 ha", label: "Área hídrica com potencial", detalhe: "para irrigação e produção" },
  { Icon: IconRoad, valor: "136 km", label: "Estradas primárias", detalhe: "pavimentadas" },
];

export default function HomeStats() {
  return (
    <section className={s.valueBand} aria-label="Nhamatanda em números">
      <div className={s.container}>
        <div className={s.values}>
          {estatisticas.map(({ Icon, valor, label, detalhe }) => (
            <div className={s.value} key={valor}>
              <span className={s.valueIcon} aria-hidden="true"><Icon size={48} /></span>
              <div><h2>{valor}</h2><p>{label}<br />{detalhe}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}