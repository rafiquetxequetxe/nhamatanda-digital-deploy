import InvestirContent from "@/components/investir/InvestirContent";
import { getAllProjetos } from "@/lib/projects";

export default function InvestirPage() {
  // Apenas os campos necessários são enviados para o componente interactivo.
  const projetos = getAllProjetos().map(({ slug, titulo, categoria, setor, fase, localizacao, imagem, resumo }) => ({
    slug, titulo, categoria, setor, fase, localizacao, imagem, resumo,
  }));
  return <InvestirContent projetos={projetos} />;
}
