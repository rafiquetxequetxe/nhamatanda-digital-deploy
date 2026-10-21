type OrgChartProps = {
  topo: string;
  filhos: string[];
};

// Organograma simples: 1 nó no topo, ligado por linhas a N nós filhos.
// As "linhas" são feitas com bordas de divs (sem imagens nem SVG externo),
// para se adaptarem automaticamente a qualquer número de filhos.
export default function OrgChart({ topo, filhos }: OrgChartProps) {
  return (
    <div className="flex flex-col items-center py-4">
      {/* Nó do topo */}
      <div className="bg-[#1F6F4A] text-white text-md font-medium rounded-lg px-8 py-3.5 shadow-sm">
        {topo}
      </div>

      {/* Linha vertical curta, do topo até à linha horizontal */}
      <div className="w-px h-10 bg-[#1F6F4A]" />

      {/* Linha horizontal que liga todos os filhos, com uma "haste" vertical para cada um */}
      <div className="relative w-full">
        <div className="absolute top-0 left-0 right-0 h-px bg-[#1F6F4A] mx-[10%]" />
        <div className="flex justify-between gap-1 pt-6">
          {filhos.map((filho) => (
            <div key={filho} className="flex flex-col items-center flex-1">
              {/* Haste vertical, de cada filho até à linha horizontal */}
              <div className="w-px h-8 bg-[#1F6F4A] -mt-6 mb-0" />
              <div className="border-2 border-gray-200 text-gray-700 text-md font-medium rounded-lg px-4 py-4 text-center w-full min-w-[140px] max-w-[200px]">
                {filho}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}