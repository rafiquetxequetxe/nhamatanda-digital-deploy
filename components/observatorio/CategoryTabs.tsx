"use client";

import { IconLeaf, IconShoppingCart, IconUsers, IconTrafficCone, IconCoins, IconGraduationCap } from "@/components/ui/Icons";

const iconesPorCategoria: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Agricultura: IconLeaf,
  Comércio: IconShoppingCart,
  População: IconUsers,
  Infraestrutura: IconTrafficCone,
  Finanças: IconCoins,
  Educação: IconGraduationCap,
};

type CategoryTabsProps = {
  categorias: string[];
  ativa: string;
  onChange: (categoria: string) => void;
};

export default function CategoryTabs({ categorias, ativa, onChange }: CategoryTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange("Todos")}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          ativa === "Todos" ? "bg-[#1F6F4A] text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100"
        }`}
      >
        Todos
      </button>
      {categorias.map((cat) => {
        const Icon = iconesPorCategoria[cat];
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              ativa === cat ? "bg-[#1F6F4A] text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100"
            }`}
          >
            {Icon && <Icon size={16} />}
            {cat}
          </button>
        );
      })}
    </div>
  );
}