import Link from "next/link";
import MiniChart from "@/components/home/MiniChart";
import { IconArrowRight } from "@/components/ui/Icons";

const producao = [
  { ano: "2019", valor: 100 },
  { ano: "2020", valor: 104 },
  { ano: "2021", valor: 106 },
  { ano: "2022", valor: 110 },
  { ano: "2023", valor: 111 },
];

const populacao = [
  { ano: "2019", valor: 78 },
  { ano: "2020", valor: 80 },
  { ano: "2021", valor: 82 },
  { ano: "2022", valor: 84 },
  { ano: "2023", valor: 85 },
];

const pib = [
  { ano: "2019", valor: 100 },
  { ano: "2020", valor: 106 },
  { ano: "2021", valor: 111 },
  { ano: "2022", valor: 117 },
  { ano: "2023", valor: 122 },
];

const indicadores = [
  {
    titulo: "Produção Agrícola",
    unidade: "(ton)",
    crescimento: "+11%",
    dados: producao,
    tipo: "linha" as const,
  },
  {
    titulo: "População",
    unidade: "(hab.)",
    crescimento: "+6%",
    dados: populacao,
    tipo: "barra" as const,
  },
  {
    titulo: "PIB",
    unidade: "(Milhões MZN)",
    crescimento: "+15%",
    dados: pib,
    tipo: "area" as const,
  },
];

export default function EconomicObservatory() {
  return (
    <div className="w-full min-w-0">

      {/* Cabeçalho */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-lg font-bold text-[#1F6F4A] tracking-wide">
            OBSERVATÓRIO ECONÓMICO
          </p>

          <p className="text-sm text-gray-500 mt-1 leading-relaxed">
            Indicadores para compreender o desempenho económico e
            orientar decisões.
          </p>
        </div>

        <Link
          href="/observatorio"
          className="shrink-0 mt-1 inline-flex items-center gap-1 text-sm font-semibold text-[#1F6F4A]"
        >
          Ver observatório completo
          <IconArrowRight size={14} />
        </Link>
      </div>

      {/* Indicadores */}
      <div className="grid grid-cols-3 gap-4 items-stretch">
        {indicadores.map((indicador) => (
          <div
            key={indicador.titulo}
            className="
              h-[280px]
              rounded-xl
              border border-[#E2E8F0]
              bg-white
              p-5
              flex
              flex-col
            "
          >
            <div>
              <p className="text-sm font-semibold text-[#0F172A] leading-tight">
                {indicador.titulo}
              </p>

              <p className="text-xs text-[#94A3B8] mt-1 leading-tight">
                2019 — 2023 {indicador.unidade}
              </p>
            </div>

            <p className="text-2xl font-bold text-[#166B45] mt-4">
              {indicador.crescimento}
            </p>

            <div className="mt-auto h-[90px] w-full">
              <MiniChart
                titulo={indicador.titulo}
                periodo="2019 — 2023"
                destaque={indicador.crescimento}
                tipo={indicador.tipo}
                dados={indicador.dados}
              />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}