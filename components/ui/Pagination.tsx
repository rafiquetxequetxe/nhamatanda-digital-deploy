import Link from "next/link";
import { IconChevronRight } from "@/components/ui/Icons";

type PaginationProps = {
  totalPaginas: number;
  paginaAtual: number;
  baseUrl: string; // ex: "/noticias?categoria=Agricultura" — a paginação acrescenta "&pagina=N"
};

// Paginação genérica — reutilizável em Notícias, Investidor, PPP, etc.
export default function Pagination({ totalPaginas, paginaAtual, baseUrl }: PaginationProps) {
  if (totalPaginas <= 1) return null;

  const separador = baseUrl.includes("?") ? "&" : "?";

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((pagina) => (
        <Link
          key={pagina}
          href={`${baseUrl}${separador}pagina=${pagina}`}
          className={`w-10 h-10 flex items-center justify-center rounded-md text-sm font-medium border transition-colors ${
            pagina === paginaAtual
              ? "bg-[#1F6F4A] text-white border-[#1F6F4A]"
              : "text-gray-600 border-gray-200 hover:border-[#1F6F4A] hover:text-[#1F6F4A]"
          }`}
        >
          {pagina}
        </Link>
      ))}
      {paginaAtual < totalPaginas && (
        <Link
          href={`${baseUrl}${separador}pagina=${paginaAtual + 1}`}
          aria-label="Próxima página"
          className="w-10 h-10 flex items-center justify-center rounded-md border border-gray-200 text-gray-600 hover:border-[#1F6F4A] hover:text-[#1F6F4A] transition-colors"
        >
          <IconChevronRight size={16} />
        </Link>
      )}
    </div>
  );
}