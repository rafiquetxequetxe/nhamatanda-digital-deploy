"use client";

import { useState } from "react";
import InterestModal from "@/components/projects/InterestModal";
import { IconFileEdit } from "@/components/ui/Icons";

type InterestButtonProps = {
  projetoTitulo: string;
  projetoSlug: string;
};

export default function InterestButton({ projetoTitulo, projetoSlug }: InterestButtonProps) {
  const [aberto, setAberto] = useState(false);

  return (
    <>
      <button
        onClick={() => setAberto(true)}
        className="w-full flex items-center justify-center gap-2 bg-[#1F6F4A] hover:bg-[#185939] text-white text-sm font-medium rounded-lg py-3 transition-colors"
      >
        <IconFileEdit size={16} />
        Manifestar Interesse
      </button>

      <InterestModal
        isOpen={aberto}
        onClose={() => setAberto(false)}
        projetoTitulo={projetoTitulo}
        projetoSlug={projetoSlug}
      />
    </>
  );
}