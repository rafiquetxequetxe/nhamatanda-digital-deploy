"use client";

import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";
import { IndicadorPrincipal } from "@/types/indicador";

type TooltipProps = { active?: boolean; payload?: { value: number }[]; label?: string };

function TooltipCustom({ active, payload, label }: TooltipProps) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md px-3 py-2">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-bold text-[#1F6F4A]">{payload[0].value.toLocaleString("pt-PT")}</p>
    </div>
  );
}

type IndicatorChartProps = {
  indicador: IndicadorPrincipal;
  altura?: number; // permite usar tamanho reduzido (Home) ou maior (Observatório)
  mostrarEixoY?: boolean;
};

// Gráfico genérico de um indicador — reutilizável em qualquer parte do site
// (Home, página /observatorio) que precise de mostrar a evolução de um indicador.
// Suporta os 3 tipos de gráfico usados no projeto: barra, linha, área.
export default function IndicatorChart({ indicador, altura = 220, mostrarEixoY = true }: IndicatorChartProps) {
  const { titulo, periodo, destaque, tipo, dados, fonte, preliminar } = indicador;

  return (
    <div className="border border-gray-100 rounded-xl p-5">
      <div className="flex items-start justify-between mb-1">
        <div>
          <p className="text-sm font-semibold text-gray-800">{titulo}</p>
          <p className="text-xs text-gray-400">{periodo}</p>
        </div>
        {preliminar && (
          <span className="text-[10px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full shrink-0">
            Dados preliminares
          </span>
        )}
      </div>

      <p className="text-2xl font-bold text-[#1F6F4A] mb-3">{destaque}</p>

      <div style={{ height: altura }}>
        <ResponsiveContainer width="100%" height="100%">
          {tipo === "barra" ? (
            <BarChart data={dados}>
              <Tooltip content={<TooltipCustom />} cursor={{ fill: "#1F6F4A", fillOpacity: 0.08 }} />
              <Bar dataKey="valor" fill="#166B45" radius={[3, 3, 0, 0]} activeBar={{ fill: "#1F6F4A" }} />
              <XAxis dataKey="ano" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              {mostrarEixoY && <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} width={40} />}
            </BarChart>
          ) : tipo === "linha" ? (
            <LineChart data={dados}>
              <Tooltip content={<TooltipCustom />} cursor={{ stroke: "#1F6F4A", strokeWidth: 1, strokeDasharray: "3 3" }} />
              <Line type="monotone" dataKey="valor" stroke="#1F6F4A" strokeWidth={2} dot={{ r: 3, fill: "#1F6F4A" }} activeDot={{ r: 5, fill: "#1F6F4A", stroke: "white", strokeWidth: 2 }} />
              <XAxis dataKey="ano" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              {mostrarEixoY && <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} width={40} />}
            </LineChart>
          ) : (
            <AreaChart data={dados}>
              <Tooltip content={<TooltipCustom />} cursor={{ stroke: "#1F6F4A", strokeWidth: 1, strokeDasharray: "3 3" }} />
              <Area type="monotone" dataKey="valor" stroke="#1F6F4A" fill="#1F6F4A" fillOpacity={0.15} strokeWidth={2} activeDot={{ r: 5, fill: "#1F6F4A", stroke: "white", strokeWidth: 2 }} />
              <XAxis dataKey="ano" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              {mostrarEixoY && <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} width={40} />}
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>

      <p className="text-[11px] text-gray-400 mt-3">Fonte: {fonte}</p>
    </div>
  );
}