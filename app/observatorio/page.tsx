import dados from "@/content/observatorio.json";
import Observatorio from "@/components/observatorio/novo/Observatorio";
import type { ObservatorioData } from "@/components/observatorio/novo/observatorio-model";

export const metadata = {
  title: "Observatório | Distrito de Nhamatanda",
  description: "Explore indicadores, séries históricas e publicações sobre o distrito de Nhamatanda.",
};

export default function ObservatorioPage() {
  return <Observatorio data={dados as ObservatorioData} />;
}