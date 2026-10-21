"use client";

import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { IconChevronDown } from "@/components/ui/Icons";
import { IndicadorPrincipal } from "@/types/indicador";

type HistoricalSeriesProps = {
  indicadores: IndicadorPrincipal[];
  serieDefault: { ano: string; valor: number }[];
};

function TooltipCustom({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md px-3 py-2">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-bold text-[#1F6F4A]">{payload[0].value.toLocaleString("pt-PT")}</p>
    </div>
  );
}

export default function HistoricalSeries({ indicadores, serieDefault }: HistoricalSeriesProps) {
  const [aberto, setAberto] = useState(false);
  const [selecionado, setSelecionado] = useState<string | null>(null); // começa sem seleção

  const indicadorAtual = indicadores.find((i) => i.id === selecionado);
  const dados = indicadorAtual ? indicadorAtual.dados : serieDefault;

  return (
    <div className="border border-gray-100 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-gray-900">Séries Históricas</h2>
        <div className="relative">
          <button
            onClick={() => setAberto(!aberto)}
            className="flex items-center gap-2 text-sm text-gray-600 border border-gray-200 rounded-md px-3 py-1.5 hover:border-[#1F6F4A]"
          >
            {indicadorAtual?.titulo ?? "Selecionar indicador"}
            <IconChevronDown size={14} />
          </button>
          {aberto && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-md shadow-lg overflow-hidden z-10">
              {indicadores.map((ind) => (
                <button
                  key={ind.id}
                  onClick={() => { setSelecionado(ind.id); setAberto(false); }}
                  className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
                >
                  {ind.titulo}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dados}>
            <Tooltip content={<TooltipCustom />} cursor={{ fill: "#1F6F4A", fillOpacity: 0.08 }} />
            <Bar dataKey="valor" fill="#7BA88F" radius={[3, 3, 0, 0]} maxBarSize={40} />
            <XAxis dataKey="ano" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} width={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}