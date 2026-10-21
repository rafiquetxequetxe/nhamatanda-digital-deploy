import { ReactNode } from "react";

// Variantes de cor do badge — pensadas para os usos previstos no MVP:
// categorias de projeto (PPP, Investimento Privado), status ("Dados Preliminares"), setores, etc.
type BadgeVariant = "verde" | "dourado" | "azul" | "cinza" | "outline";

type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

const variantStyles: Record<BadgeVariant, string> = {
  verde: "bg-[#1F6F4A]/10 text-[#1F6F4A]",       // ex: categoria "PPP"
  dourado: "bg-[#C9A227]/10 text-[#C9A227]",     // ex: destaque/setor
  azul: "bg-blue-50 text-blue-700",              // ex: categoria "Investimento Privado"
  cinza: "bg-gray-100 text-gray-600",            // ex: metadados neutros
  outline: "border border-gray-200 text-gray-600", // ex: "Dados Preliminares" (aviso discreto)
};

// Etiqueta pequena e arredondada — usada para marcar categoria, setor ou status
// dentro de cards de projeto, notícias, indicadores, etc.
// Uso: <Badge variant="verde">PPP</Badge>
export default function Badge({ children, variant = "cinza", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}