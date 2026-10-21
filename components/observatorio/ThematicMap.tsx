type ThematicMapProps = {
  indicador: string;
  legenda: { nivel: string; cor: string }[];
  localidades: { nome: string; nivel: string }[];
};

// NOTA: versão simplificada (grid de localidades com badge de cor).
// Um mapa "choropleth" real precisa de um ficheiro GeoJSON com os limites
// geográficos das localidades — ainda não disponível. Trocar por mapa real
// assim que tivermos esse ficheiro (ex: via Tech Lead ou fonte oficial).
export default function ThematicMap({ indicador, legenda, localidades }: ThematicMapProps) {
  const corPorNivel = Object.fromEntries(legenda.map((l) => [l.nivel, l.cor]));

  return (
    <div>
      <div className="border border-gray-100 rounded-xl p-4 mb-4">
        <p className="text-xs text-gray-500 mb-3">{indicador}</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {localidades.map(({ nome, nivel }) => (
            <div
              key={nome}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-white"
              style={{ backgroundColor: corPorNivel[nivel] ?? "#E5E7EB", color: nivel === "Sem dados" ? "#6B7280" : "white" }}
            >
              {nome}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {legenda.map(({ nivel, cor }) => (
          <div key={nivel} className="flex items-center gap-2 text-xs text-gray-600">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: cor }} />
            {nivel}
          </div>
        ))}
      </div>
    </div>
  );
}