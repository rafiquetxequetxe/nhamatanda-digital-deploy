"use client";

import { useState } from "react";
import { IconFileText, IconDownload, IconSearch, IconChevronDown } from "@/components/ui/Icons";
import { Relatorio } from "@/types/indicador";
import { formatarDataRelatorio } from "@/lib/indicadores";

type ReportsSectionProps = {
  relatorios: Relatorio[];
};

// Cor de fundo/texto do ícone de documento, consoante a categoria do relatório
const coresPorCategoria: Record<Relatorio["categoria"], { bg: string; text: string }> = {
  verde: { bg: "bg-green-50", text: "text-green-600" },
  azul: { bg: "bg-blue-50", text: "text-blue-600" },
  dourado: { bg: "bg-amber-50", text: "text-amber-600" },
  roxo: { bg: "bg-purple-50", text: "text-purple-600" },
};

export default function ReportsSection({ relatorios }: ReportsSectionProps) {
  const [termo, setTermo] = useState("");
  const [tipoAtivo, setTipoAtivo] = useState("Todos os tipos");
  const [anoAtivo, setAnoAtivo] = useState("Todos");

  // Deriva as opções dos dropdowns diretamente dos dados, para não ter listas manuais desatualizadas
  const tipos = ["Todos os tipos", ...Array.from(new Set(relatorios.map((r) => r.tipo)))];
  const anos = ["Todos", ...Array.from(new Set(relatorios.map((r) => new Date(r.data).getFullYear().toString())))];

  const filtrados = relatorios.filter((r) => {
    const bateTermo = r.titulo.toLowerCase().includes(termo.toLowerCase());
    const bateTipo = tipoAtivo === "Todos os tipos" || r.tipo === tipoAtivo;
    const bateAno = anoAtivo === "Todos" || new Date(r.data).getFullYear().toString() === anoAtivo;
    return bateTermo && bateTipo && bateAno;
  });

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Relatórios e Publicações</h2>

      {/* Barra de filtros */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-6">
        <div className="flex flex-wrap gap-3">
          {/* Filtro: Tipo */}
          <div className="relative">
            <select
              value={tipoAtivo}
              onChange={(e) => setTipoAtivo(e.target.value)}
              className="appearance-none border border-gray-200 rounded-md pl-3 pr-8 py-2 text-sm text-gray-600 outline-none focus:border-[#1F6F4A] bg-white"
            >
              {tipos.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <IconChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {/* Filtro: Ano */}
          <div className="relative">
            <select
              value={anoAtivo}
              onChange={(e) => setAnoAtivo(e.target.value)}
              className="appearance-none border border-gray-200 rounded-md pl-3 pr-8 py-2 text-sm text-gray-600 outline-none focus:border-[#1F6F4A] bg-white"
            >
              {anos.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
            <IconChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Pesquisa */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={termo}
            onChange={(e) => setTermo(e.target.value)}
            placeholder="Pesquisar relatórios..."
            className="w-full border border-gray-200 rounded-md pl-4 pr-9 py-2 text-sm outline-none focus:border-[#1F6F4A]"
          />
          <IconSearch size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Resultados */}
      {filtrados.length === 0 ? (
        <p className="text-sm text-gray-500">Nenhum relatório encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtrados.map((r) => {
            const cor = coresPorCategoria[r.categoria];
            return (
              <div key={r.titulo} className="border border-gray-100 rounded-xl p-5 hover:shadow-md transition-all duration-200">
                <span className={`inline-flex items-center justify-center w-11 h-11 rounded-lg ${cor.bg} ${cor.text} mb-3`}>
                  <IconFileText size={30} />
                </span>
                <p className="text-sm font-bold text-gray-900 mb-2 leading-snug">{r.titulo}</p>
                <p className="text-xs text-gray-400 mb-1">{r.tipo}</p>
                <p className="text-xs text-gray-400 mb-4">{r.tamanho} · {formatarDataRelatorio(r.data)}</p>
                <a
                  href={r.url}
                  download
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1F6F4A] hover:gap-2 transition-all duration-200"
                >
                  <IconDownload size={14} /> Download
                </a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}