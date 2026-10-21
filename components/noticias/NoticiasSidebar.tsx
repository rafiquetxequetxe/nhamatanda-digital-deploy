import Link from "next/link";
import { IconSearch } from "@/components/ui/Icons";
import StatCounter from "@/components/ui/StatCounter";

type NoticiasSidebarProps = {
  categorias: string[];
  categoriaAtiva: string;
  termoPesquisa?: string;
};

// Sidebar de filtros da listagem de notícias: pesquisa por texto + lista de categorias.
// Implementado com links normais (não useState), para funcionar sem JavaScript
// no cliente e manter a página como Server Component.
export default function NoticiasSidebar({ categorias, categoriaAtiva, termoPesquisa }: NoticiasSidebarProps) {
  return (
    <aside className="w-full lg:w-64 shrink-0">
      {/* Pesquisa */}
      <form action="/noticias" method="GET" className="relative mb-6">
        <input
          type="text"
          name="q"
          defaultValue={termoPesquisa}
          placeholder="Pesquisar notícias..."
          className="w-full border border-gray-200 rounded-md pl-4 pr-10 py-2.5 text-sm outline-none focus:border-[#1F6F4A]"
        />
        <button
          type="submit"
          aria-label="Pesquisar"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1F6F4A]"
        >
          <IconSearch size={16} />
        </button>
      </form>

      {/* Categorias */}
      <p className="text-md font-bold text-gray-900 mb-3"><strong>Categorias</strong></p>
      <ul className="space-y-1">
        <li>
          <Link
            href="/noticias"
            className={`block px-3 py-2 rounded-md text-sm transition-colors ${
              categoriaAtiva === "Todas"
                ? "bg-[#1F6F4A]/10 text-[#1F6F4A] font-semibold border-l-2 border-[#1F6F4A]"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Todas
          </Link>
        </li>
        {categorias.map((cat) => (
          <li key={cat}>
            <Link
              href={`/noticias?categoria=${encodeURIComponent(cat)}`}
              className={` px-3 py-2 rounded-md text-sm hover:scale-110 transition-all duration-200 ease-out inline-block ${
                categoriaAtiva === cat
                  ? "bg-[#1F6F4A]/10 text-[#1F6F4A] font-semibold border-l-2 border-[#1F6F4A]"
                  : "text-gray-600 hover:bg-green-50"
              }`}
            >
             {cat}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}