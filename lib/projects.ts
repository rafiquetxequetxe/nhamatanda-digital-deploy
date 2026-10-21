import projetosData from "@/content/projetos.json";
import { Projeto } from "@/types/project";

export function getAllProjetos(): Projeto[] {
  return projetosData as Projeto[];
}

export function getProjetoBySlug(slug: string): Projeto | undefined {
  return (projetosData as Projeto[]).find((p) => p.slug === slug);
}

// Devolve os projetos filtrados por categoria (usado no Catálogo PPP,
// que reutiliza este mesmo ficheiro filtrando por categoria = "PPP").
export function getProjetosByCategoria(categoria: string): Projeto[] {
  return getAllProjetos().filter((p) => p.categoria === categoria);
}


export function getProjetosRelacionados(slugAtual: string, setor: string, quantidade: number = 4): Projeto[] {
  const mesmoSetor = getAllProjetos().filter((p) => p.slug !== slugAtual && p.setor === setor);
  if (mesmoSetor.length >= quantidade) return mesmoSetor.slice(0, quantidade);

  const outros = getAllProjetos().filter((p) => p.slug !== slugAtual && p.setor !== setor);
  return [...mesmoSetor, ...outros].slice(0, quantidade);
}
// Devolve os tipos de investimento/PPP únicos presentes nos projetos de uma categoria
// (usado no filtro "Tipo de PPP" da página /ppp)
export function getSetores(): string[] {
  return Array.from(new Set(getAllProjetos().map((p) => p.setor))).filter(Boolean);
}

export function getFases(): string[] {
  return Array.from(new Set(getAllProjetos().map((p) => p.fase))).filter(Boolean);
}

export function getTiposInvestimento(categoria?: string): string[] {
  const base = categoria ? getProjetosByCategoria(categoria) : getAllProjetos();
  return Array.from(new Set(base.map((p) => p.tipoInvestimento))).filter(Boolean) as string[];
}

export function getLocalizacoes(): string[] {
  return Array.from(new Set(getAllProjetos().map((p) => p.localizacao))).filter(Boolean);
}