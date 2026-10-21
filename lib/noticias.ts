import noticiasData from "@/content/noticias.json";
import { Noticia } from "@/types/noticia";


// ============================================================
// NORMALIZAÇÃO DE TEXTO
// ============================================================
// Remove acentos, converte para minúsculas e normaliza espaços.
// Exemplo:
// "Água Potável" -> "agua potavel"
// "EDUCAÇÃO"     -> "educacao"
function normalizarTexto(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
}

// ============================================================
// CATEGORIAS
// ============================================================

export function getCategoriasNoticias(): string[] {
  const categorias = getAllNoticias().map((n) => n.categoria);

  return Array.from(new Set(categorias)).sort((a, b) =>
    a.localeCompare(b, "pt")
  );
}


// ============================================================
// TODAS AS NOTÍCIAS
// ============================================================

export function getAllNoticias(): Noticia[] {
  return [...(noticiasData as Noticia[])].sort(
    (a, b) =>
      new Date(b.data).getTime() -
      new Date(a.data).getTime()
  );
}


// ============================================================
// NOTÍCIAS EM DESTAQUE
// ============================================================

export function getNoticiasDestaque(
  quantidade: number = 3
): Noticia[] {
  return getAllNoticias().slice(0, quantidade);
}


// ============================================================
// NOTÍCIA POR SLUG
// ============================================================

export function getNoticiaBySlug(
  slug: string
): Noticia | undefined {
  return (noticiasData as Noticia[]).find(
    (n) => n.slug === slug
  );
}


// ============================================================
// PESQUISA DE NOTÍCIAS
// ============================================================
//
// Pesquisa em TODOS os campos relevantes da notícia.
//
// Exemplo:
// pesquisar "agua"
//
// Pode encontrar:
// titulo: "Novo sistema de água potável"
// resumo: "A água chega a mais famílias"
// conteudo: "...abastecimento de água..."
// fonte: "FIPAG"
//
// Também ignora:
// - maiúsculas/minúsculas
// - acentos
//
// Portanto:
// "água" = "agua"
// "EDUCAÇÃO" = "educacao"
//
// ============================================================

export function pesquisarNoticias(
  noticias: Noticia[],
  termo: string
): Noticia[] {

  const pesquisa = normalizarTexto(termo);

  // Se não houver pesquisa, devolve tudo.
  if (!pesquisa) {
    return noticias;
  }

  return noticias.filter((noticia) => {

    const camposPesquisa = [

      // Identificação
      noticia.slug,
      noticia.titulo,
      noticia.categoria,

      // Conteúdo editorial
      noticia.resumo,
      noticia.conteudo,

      // Metadados
      noticia.data,
      noticia.autor,
      noticia.fonte,
      noticia.fonteUrl,

      // Imagem principal
      noticia.imagem,

      // Galeria
      ...(noticia.galeria ?? []),

    ];

    return camposPesquisa.some((campo) => {
      if (!campo) return false;

      return normalizarTexto(String(campo)).includes(
        pesquisa
      );
    });
  });
}


// ============================================================
// FILTRO COMPLETO DE NOTÍCIAS
// ============================================================
//
// Permite combinar:
//
// categoria + pesquisa
//
// Exemplos:
//
// /noticias?q=agua
//
// /noticias?categoria=Infraestrutura
//
// /noticias?categoria=Infraestrutura&q=ponte
//
// ============================================================

export function filtrarNoticias(
  termoPesquisa?: string,
  categoria?: string
): Noticia[] {

  let noticias = getAllNoticias();

  // ----------------------------------------------------------
  // FILTRO POR CATEGORIA
  // ----------------------------------------------------------

  if (
    categoria &&
    categoria !== "Todas"
  ) {
    const categoriaNormalizada =
      normalizarTexto(categoria);

    noticias = noticias.filter(
      (noticia) =>
        normalizarTexto(noticia.categoria) ===
        categoriaNormalizada
    );
  }

  // ----------------------------------------------------------
  // PESQUISA
  // ----------------------------------------------------------

  if (termoPesquisa?.trim()) {
    noticias = pesquisarNoticias(
      noticias,
      termoPesquisa
    );
  }

  return noticias;
}


/* Devolve a lista de categorias únicas presentes nas notícias, para a sidebar.
export function getCategoriasNoticias(): string[] {
  const categorias = getAllNoticias().map((n) => n.categoria);
  return Array.from(new Set(categorias));
}

 Devolve todas as notícias, já ordenadas da mais recente para a mais antiga.
export function getAllNoticias(): Noticia[] {
  return [...(noticiasData as Noticia[])].sort(
    (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
  );
}

// Devolve só as N notícias mais recentes — usado na Home ("Notícias e Destaques").
export function getNoticiasDestaque(quantidade: number = 3): Noticia[] {
  return getAllNoticias().slice(0, quantidade);
}

// Devolve uma notícia específica pelo slug, ou undefined se não existir
// (usado na página individual /noticias/[slug]).
export function getNoticiaBySlug(slug: string): Noticia | undefined {
  return (noticiasData as Noticia[]).find((n) => n.slug === slug);
}

*/
// Formata a data ISO ("2025-05-12") para o formato usado no site ("12 Mai 2025").
export function formatarData(dataISO: string): string {

const data = new Date(`${dataISO}T00:00:00`);

  const meses = [
    "JAN",
    "FEV",
    "MAR",
    "ABR",
    "MAI",
    "JUN",
    "JUL",
    "AGO",
    "SET",
    "OUT",
    "NOV",
    "DEZ",
  ];

  const dia = String(data.getDate()).padStart(2, "0");
  const mes = meses[data.getMonth()];
  const ano = data.getFullYear();

  return `${dia} ${mes} ${ano}`;
  
}
// Calcula o tempo estimado de leitura, com base numa média de 200 palavras/minuto.
export function calcularTempoLeitura(conteudo: string): number {
  const palavras = conteudo.trim().split(/\s+/).length;
  return Math.max(1, Math.round(palavras / 200));
}
// Devolve até N notícias da mesma categoria, excluindo a notícia atual.
// Usado na secção "Notícias Relacionadas".
export function getNoticiasRelacionadas(slugAtual: string, categoria: string, quantidade: number = 3): Noticia[] {
  return getAllNoticias()
    .filter((n) => n.slug !== slugAtual && n.categoria === categoria)
    .slice(0, quantidade);
}