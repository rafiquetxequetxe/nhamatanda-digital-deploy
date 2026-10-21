// Define a "forma" que uma notícia deve ter — o editor avisa
// se um item do noticias.json estiver com um campo em falta ou errado.
export type Noticia = {
  slug: string;
  titulo: string;
  categoria: string;
  data: string; // formato ISO: "AAAA-MM-DD", para poder ordenar/formatar facilmente
  imagem: string;
  resumo: string;
  conteudo: string; // texto completo, usado só na página individual
  autor?: string; //opcional — se não vier no JSON, usamos um valor padrão
  galeria?: string[]; // caminhos de imagens extra, opcional

  // Proveniência da informação
  fonte?: string; // fonte da notícia, opcional, usado em casos que a noticia é de outra fonte (ex: imprensa), para dar crédito. Se não vier, usamos um valor padrão
  fonteUrl?: string; // URL da fonte, opcional, usado em casos que a noticia é de outra fonte (ex: imprensa), para dar crédito. Se não vier, usamos um valor padrão
};