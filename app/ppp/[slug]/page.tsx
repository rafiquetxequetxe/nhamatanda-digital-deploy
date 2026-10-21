import { notFound } from "next/navigation";
import { getProjetosByCategoria, getProjetoBySlug, getProjetosRelacionados } from "@/lib/projects";
import OpportunityDetail from "@/components/oportunidades/detalhe/OpportunityDetail";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getProjetosByCategoria("PPP").map(p => ({ slug: p.slug }));
}

export default async function PPPPage({ params }: Props) {
  const { slug } = await params;
  const projeto = getProjetoBySlug(slug);
  if (!projeto || projeto.categoria !== "PPP") notFound();
  return <OpportunityDetail projeto={projeto} relacionados={getProjetosRelacionados(slug, projeto.setor, 3)} />;
}