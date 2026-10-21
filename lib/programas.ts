import programasData from "@/content/programas-governacao.json";

export type Programa = {
  id: string;
  slug: string;
  nome: string;
  assinatura: string;
  missao: string;
  numeroMissao: number | null;
  tituloMissaoPagina: string | null;
  visivelNaGrelhaMissoes: boolean;
  tipo: string;
  estado: string;
  prioridade: string;
  resumo: string;
  visao: string;
  problema: {
    descricao: string;
    questoesDiagnostico: string[];
    dadosEmFalta: string[];
  };
  solucao: { descricao: string; frentes: string[] };
  objetivos: string[];
  beneficiarios: { diretos: string[]; indiretos: string[] };
  impactoEsperado: string[];
  indicadores: string[];
  parceirosProcurados: { tipo: string; perfis: string[] }[];
  projetosRelacionados: { slug: string; nome: string; relacao: string }[];
  galeria: {
    totalFotos: number;
    tipos: { tipo: string; quantidade: number; orientacao: string; conteudo: string }[];
    evitar: string[];
  };
  documentosDesejados: string[];
  cta: string;
};

const programas = programasData.programas as Programa[];

export function getProgramasVisiveis(): Programa[] {
  return programas
    .filter((p) => p.visivelNaGrelhaMissoes)
    .sort((a, b) => (a.numeroMissao ?? 0) - (b.numeroMissao ?? 0));
}

export function getProgramaBySlug(slug: string): Programa | undefined {
  return programas.find((p) => p.slug === slug);
}

export function getProgramasRelacionados(programa: Programa): Programa[] {
  return programa.projetosRelacionados
    .map((rel) => programas.find((p) => p.slug === rel.slug))
    .filter((p): p is Programa => Boolean(p));
}

export function getAllSlugs(): string[] {
  return programas.map((p) => p.slug);
}