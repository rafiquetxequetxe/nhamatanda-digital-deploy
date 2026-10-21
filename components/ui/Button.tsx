import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";

// ─────────────────────────────────────────────
// TIPOS (TypeScript)
// ─────────────────────────────────────────────

// As 4 aparências visuais possíveis do botão
type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";

// Os 3 tamanhos possíveis
type ButtonSize = "sm" | "md" | "lg";

// Propriedades comuns a QUALQUER botão, independentemente de ser <button> ou <Link>
type BaseProps = {
  children: ReactNode;      // o conteúdo dentro do botão (texto, ícone, etc.)
  variant?: ButtonVariant;  // "?" = opcional (se não passar, usamos um valor padrão mais abaixo)
  size?: ButtonSize;
  className?: string;       // permite adicionar classes extra Tailwind quando necessário
};

// Caso 1: o componente é usado como um <button> normal (para onClick, formulários, etc.)
// Junta as props base + todas as props nativas de um <button> do HTML (type, onClick, disabled...)
// "href?: undefined" garante que, neste caso, NÃO se pode passar href por engano
type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

// Caso 2: o componente é usado como um link de navegação (quando se passa "href")
type ButtonAsLink = BaseProps & {
  href: string;
};

// O tipo final aceita QUALQUER um dos dois casos acima.
// Isto é o que permite escrever tanto <Button onClick={...}> como <Button href="/pagina">
// e o TypeScript avisa se tentar misturar as duas coisas ao mesmo tempo.
type ButtonProps = ButtonAsButton | ButtonAsLink;

// ─────────────────────────────────────────────
// ESTILOS POR VARIANTE E TAMANHO
// Guardados em objetos para não precisar de "if/else" gigante no JSX.
// Record<X, Y> = "objeto onde as chaves são do tipo X e os valores são do tipo Y"
// ─────────────────────────────────────────────

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-[#1F6F4A] text-white hover:bg-[#185939]",       // verde sólido — ação principal (ex: "Enviar")
  secondary: "bg-[#C9A227] text-white hover:bg-[#b08f22]",     // dourado sólido — ação de destaque alternativa
  outline: "border-2 border-[#1F6F4A] text-[#1F6F4A] hover:bg-[#1F6F4A] hover:text-white", // contorno — ação secundária
  ghost: "text-[#1F6F4A] hover:bg-[#1F6F4A]/10",               // sem fundo — ação discreta (ex: "Cancelar")
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "text-sm px-4 py-2",   // botão pequeno
  md: "text-sm px-6 py-3",   // botão médio (tamanho padrão)
  lg: "text-base px-8 py-4", // botão grande
};

// Estilos aplicados a TODOS os botões, independentemente da variante/tamanho:
// - inline-flex + items-center + justify-center: centra o conteúdo (texto/ícone) dentro do botão
// - hover:scale-105: cresce ligeiramente ao passar o rato
// - active:scale-95: encolhe ligeiramente ao clicar (feedback tátil visual)
// - disabled:...: quando o botão está desativado, fica semitransparente e sem interações
const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 ease-out hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none disabled:hover:scale-100";

// ─────────────────────────────────────────────
// COMPONENTE BUTTON
// ─────────────────────────────────────────────
export default function Button({
  children,
  variant = "primary", // valor padrão se não for especificado
  size = "md",          // valor padrão se não for especificado
  className = "",
  href,
  ...props // recolhe todas as outras props não desestruturadas acima (ex: onClick, type, disabled...)
}: ButtonProps) {

  // Junta o estilo base + o estilo da variante escolhida + o estilo do tamanho escolhido
  // + quaisquer classes extra passadas via className
  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  // Se foi passado um "href", renderiza como link de navegação (Next.js Link)
  // Usado quando o botão deve levar a outra página (ex: <Button href="/investir">)
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  // Caso contrário, renderiza como um <button> normal do HTML
  // (usado para ações como submeter formulários, abrir modais, onClick, etc.)
  // "...props" espalha aqui todas as props nativas do botão que tenham sido passadas
  // (ex: type="submit", onClick={...}, disabled={true})
  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}