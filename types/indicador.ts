export type PontoDado = { ano: string; valor: number };

export type EstatisticaRapida = {
  id: string;
  label: string;
  valor: string;
  icone: string;
  cor: "verde" | "verdeClaro" | "azul" | "dourado";
};

export type IndicadorPrincipal = {
  id: string;
  titulo: string;
  categoria: string;
  periodo: string;
  destaque: string;
  tipo: "barra" | "linha" | "area";
  unidade: string;
  fonte: string;
  preliminar: boolean;
  dados: PontoDado[];
};

export type LinhaTabela = {
  indicador: string;
  "2022": string;
  "2023": string;
  "2024": string;
  variacao: string;
};

export type LocalidadeMapa = { nome: string; nivel: "Alta" | "Média" | "Baixa" | "Sem dados" };

export type Relatorio = {
  titulo: string;
  tipo: string;
  categoria: "verde" | "azul" | "dourado" | "roxo";
  tamanho: string;
  data: string;
  url: string;
};