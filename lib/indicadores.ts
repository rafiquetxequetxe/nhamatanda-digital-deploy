import data from "@/content/indicadores.json";
import { EstatisticaRapida, IndicadorPrincipal, LinhaTabela, Relatorio, PontoDado } from "@/types/indicador";

export function getEstatisticasRapidas(): EstatisticaRapida[] {
  return data.estatisticasRapidas as EstatisticaRapida[];
}

export function getCategorias(): string[] {
  return data.categorias;
}

export function getIndicadoresPrincipais(categoria?: string): IndicadorPrincipal[] {
  const todos = data.indicadoresPrincipais as IndicadorPrincipal[];
  if (!categoria || categoria === "Todos") return todos;
  return todos.filter((i) => i.categoria === categoria);
}

export function getTabelaIndicadores(): LinhaTabela[] {
  return data.tabelaIndicadores as LinhaTabela[];
}

export function getMapaTematico() {
  return data.mapaTematico;
}

export function getRelatorios(): Relatorio[] {
  return data.relatorios as Relatorio[];
}

export function formatarDataRelatorio(dataISO: string): string {
  return new Date(dataISO).toLocaleDateString("pt-PT", { day: "2-digit", month: "short", year: "numeric" }).replace(".", "");
}
// Para os mini-gráficos da secção "Indicadores Principais": mostra só os últimos 5 pontos
export function getUltimosPontos(dados: PontoDado[], n: number = 5): PontoDado[] {
  return dados.slice(-n);
}