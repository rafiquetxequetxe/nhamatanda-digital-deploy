export type Ponto = { ano: number; valor: number | null };
export type Indicador = {
  id: string;
  titulo: string;
  categoria: string;
  unidade: string;
  tipo: "barra" | "linha" | "area";
  demonstrativo: boolean;
  fonte: string;
  leitura: string;
  metodologia: string;
  dados: Ponto[];
};
export type Territorio = {
  id: string;
  titulo: string;
  unidade: string;
  ano: number;
  demonstrativo: boolean;
  fonte: string;
  nota: string;
  areas: { nome: string; valor: number | null }[];
};
export type Publicacao = {
  id: string;
  titulo: string;
  tipo: string;
  ano: number;
  demonstrativo: boolean;
  resumo: string;
  url: string | null;
  indicador?: string;
  seccoes: { titulo: string; texto: string }[];
};
export type ObservatorioData = {
  demonstrativo: boolean;
  hero: { imagem: string; alt: string; titulo: string; descricao: string };
  indicadorInicial: string;
  destaques: { indicador: string; rotulo: string; icone: string; divisor: number; sufixo: string }[];
  indicadores: Indicador[];
  territorio: Territorio[];
  publicacoes: Publicacao[];
};

export const numero = (value: number, decimais = 1) =>
  new Intl.NumberFormat("pt-PT", { maximumFractionDigits: decimais }).format(value);

export function serieOrdenada(dados: Ponto[]): Ponto[] {
  return dados.filter(p => Number.isInteger(p.ano)).map(p => ({
    ano: p.ano,
    valor: typeof p.valor === "number" && Number.isFinite(p.valor) ? p.valor : null,
  })).sort((a, b) => a.ano - b.ano);
}
export function pontosValidos(dados: Ponto[]): { ano: number; valor: number }[] {
  return serieOrdenada(dados).filter((p): p is { ano: number; valor: number } => p.valor !== null);
}
export function ultimo(dados: Ponto[]) { return pontosValidos(dados).at(-1); }

export function recortar(dados: Ponto[], periodo: string): Ponto[] {
  const serie = serieOrdenada(dados);
  const fim = serie.at(-1)?.ano;
  if (fim === undefined || periodo === "todos") return serie;
  const n = periodo === "3" ? 3 : 5;
  return serie.filter(p => p.ano >= fim - n + 1);
}
// Um ano em falta permanece uma lacuna, nunca é convertido em zero.
export function preencherAnos(dados: Ponto[]): Ponto[] {
  const serie = serieOrdenada(dados);
  const inicio = serie[0]?.ano;
  const fim = serie.at(-1)?.ano;
  if (inicio === undefined || fim === undefined || fim - inicio > 200) return serie;
  const porAno = new Map(serie.map(p => [p.ano, p.valor]));
  return Array.from({ length: fim - inicio + 1 }, (_, i) => ({ ano: inicio + i, valor: porAno.get(inicio + i) ?? null }));
}
export function variacao(dados: Ponto[], unidade: string) {
  const validos = pontosValidos(dados);
  const actual = validos.at(-1);
  const anterior = validos.at(-2);
  if (!actual || !anterior) return null;
  const percentual = unidade.trim() === "%";
  if (!percentual && anterior.valor === 0) return null;
  const valor = percentual ? actual.valor - anterior.valor : (actual.valor - anterior.valor) / Math.abs(anterior.valor) * 100;
  return { valor, unidade: percentual ? "p.p." : "%", anoBase: anterior.ano, anoActual: actual.ano };
}
export function intervalo(dados: Ponto[]) {
  const serie = serieOrdenada(dados);
  if (!serie.length) return "Sem período disponível";
  return serie.length === 1 ? String(serie[0].ano) : `${serie[0].ano}–${serie[serie.length - 1].ano}`;
}
function celula(value: unknown) {
  let text = String(value ?? "");
  if (typeof value === "string" && /^[=+\-@\t\r]/.test(text)) text = `'${text}`;
  return `"${text.replaceAll('"', '""')}"`;
}
export function criarCSV(indicador: Indicador, dados: Ponto[], demonstrativo: boolean) {
  const linhas: unknown[][] = [
    ["Indicador", indicador.titulo],
    ["Estado", demonstrativo ? "DADOS DEMONSTRATIVOS — NÃO OFICIAIS" : "Dados publicados"],
    ["Fonte", indicador.fonte],
    ["Unidade", indicador.unidade],
    ["Período", intervalo(dados)],
    [], ["Ano", "Valor", "Unidade"],
    ...preencherAnos(dados).map(p => [p.ano, p.valor === null ? "" : String(p.valor).replace(".", ","), indicador.unidade]),
  ];
  return "\uFEFF" + linhas.map(linha => linha.map(celula).join(";")).join("\r\n");
}
export function descarregar(texto: string, nome: string, tipo = "text/csv;charset=utf-8") {
  const url = URL.createObjectURL(new Blob([texto], { type: tipo }));
  const a = document.createElement("a");
  a.href = url;
  a.download = nome;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export function urlPublicacao(value: string | null) {
  const url = value?.trim();
  if (!url || url === "#") return null;
  if (url.startsWith("/") && !url.startsWith("//") && !url.includes("\\")) return url;
  try { return ["https:", "http:"].includes(new URL(url).protocol) ? url : null; }
  catch { return null; }
}