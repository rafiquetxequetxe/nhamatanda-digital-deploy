"use client";

import { useState } from "react";
import { IconChevronDown } from "@/components/ui/Icons";

type FaqItemProps = {
  pergunta: string;
  resposta: string;
};

// Item individual de "Perguntas Frequentes" — clicável, expande/recolhe a resposta.
// Cada FaqItem gere o seu próprio estado (aberto/fechado) de forma independente,
// para permitir várias perguntas abertas ao mesmo tempo (comportamento comum em FAQs).
export default function FaqItem({ pergunta, resposta }: FaqItemProps) {
  const [aberto, setAberto] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-100">
      <button
        onClick={() => setAberto(!aberto)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="text-lg font-bold text-gray-800">{pergunta}</span>
        <IconChevronDown
          size={16}
          className={`shrink-0 text-gray-500 transition-transform duration-200 ${
            aberto ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Só renderiza a resposta quando aberto === true */}
      {aberto && (
        <div className="font-bold text-md px-6 pb-6 text-gray-600">{resposta}</div>
      )}
    </div>
  );
}