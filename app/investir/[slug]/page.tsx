import { notFound } from "next/navigation";
import { getAllProjetos, getProjetoBySlug, getProjetosRelacionados } from "@/lib/projects";
import OpportunityDetail from "@/components/oportunidades/detalhe/OpportunityDetail";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllProjetos().map(p => ({ slug: p.slug }));
}

export default async function ProjetoPage({ params }: Props) {
  const { slug } = await params;
  const projeto = getProjetoBySlug(slug);
  if (!projeto) notFound();

  // Mantém válidos os links antigos /investir/slug, mesmo para um projecto PPP.
  return <OpportunityDetail projeto={projeto} relacionados={getProjetosRelacionados(slug, projeto.setor, 3)} />;
}