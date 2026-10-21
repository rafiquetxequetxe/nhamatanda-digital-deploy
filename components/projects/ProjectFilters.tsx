import Link from "next/link";

type SegundoFiltro = {
  label: string; // "Fase" ou "Tipo de PPP"
  nomeCampo: string; // "fase" ou "tipo"
  opcoes: string[];
  ativos: string[];
};

type ProjectFiltersProps = {
  setores: string[];
  setorAtivo: string[];
  segundoFiltro: SegundoFiltro;
  localizacoes: string[];
  localizacaoAtiva: string;
  baseHref: string;
};

export default function ProjectFilters({
  setores,
  setorAtivo,
  segundoFiltro,
  localizacoes,
  localizacaoAtiva,
  baseHref,
}: ProjectFiltersProps) {
  return (
    <aside className="w-full lg:w-64 shrink-0">
      <form action={baseHref} method="GET">
        <p className="text-base font-bold text-gray-900 mb-4">Filtros</p>

        <div className="mb-6">
          <p className="text-sm font-bold text-gray-800 mb-3">Setor</p>
          <div className="space-y-2">
            {setores.map((setor) => (
              <label key={setor} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  name="setor"
                  value={setor}
                  defaultChecked={setorAtivo.includes(setor)}
                  className="rounded border-gray-300 text-[#1F6F4A] focus:ring-[#1F6F4A]"
                />
                {setor}
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm font-bold text-gray-800 mb-3">{segundoFiltro.label}</p>
          <div className="space-y-2">
            {segundoFiltro.opcoes.map((opcao) => (
              <label key={opcao} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  name={segundoFiltro.nomeCampo}
                  value={opcao}
                  defaultChecked={segundoFiltro.ativos.includes(opcao)}
                  className="rounded border-gray-300 text-[#1F6F4A] focus:ring-[#1F6F4A]"
                />
                {opcao}
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm font-bold text-gray-800 mb-3">Localização</p>
          <select
            name="localizacao"
            defaultValue={localizacaoAtiva}
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-[#1F6F4A]"
          >
            <option value="Todas">Todas</option>
            {localizacoes.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-[#1F6F4A] hover:bg-[#185939] text-white text-sm font-medium rounded-md py-2.5 transition-colors mb-2"
        >
          Aplicar Filtros
        </button>
        <Link
          href={baseHref}
          className="block w-full text-center border border-gray-200 hover:border-gray-300 text-gray-600 text-sm font-medium rounded-md py-2.5 transition-colors"
        >
          Limpar Filtros
        </Link>
      </form>
    </aside>
  );
}