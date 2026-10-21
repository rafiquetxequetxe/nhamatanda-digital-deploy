"use client";

import { useState } from "react";
import { IconChevronDown } from "@/components/ui/Icons";

type AboutProjectExpandableProps = {
  resumo: string[];
  completo?: string[];
};

export default function AboutProjectExpandable({ resumo, completo }: AboutProjectExpandableProps) {
  const [expandido, setExpandido] = useState(false);
  const temMais = completo && completo.length > 0;

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4"><strong>Sobre o Projeto</strong></h2>
      <div className="space-y-3">
        {resumo.map((p, i) => (
          <p key={i} className="text-md text-gray-600 leading-relaxed">{p}</p>
        ))}
        {expandido && completo?.map((p, i) => (
          <p key={`extra-${i}`} className="text-md text-gray-600 leading-relaxed">{p}</p>
        ))}
      </div>

      {temMais && (
        <button
          onClick={() => setExpandido(!expandido)}
          className="mt-3 flex items-center gap-1 text-md font-semibold text-[#1F6F4A]"
        >
          {expandido ? "Ver menos" : "Ver mais"}
          <IconChevronDown size={14} className={`transition-transform duration-200 ${expandido ? "rotate-180" : ""}`} />
        </button>
      )}
    </div>
  );
}