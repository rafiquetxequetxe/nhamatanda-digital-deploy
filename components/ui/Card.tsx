import { ReactNode } from "react";

// ─────────────────────────────────────────────
// TIPO DE PROPS
// Usado pelo Card principal (os subcomponentes abaixo têm o seu próprio tipo inline,
// por serem mais simples e não precisarem de "hoverable")
// ─────────────────────────────────────────────
type CardProps = {
  children: ReactNode;   // o conteúdo dentro do card (normalmente os subcomponentes abaixo)
  className?: string;    // permite adicionar classes extra Tailwind quando necessário
  hoverable?: boolean;   // liga/desliga o efeito de "elevação" ao passar o rato
};

// ─────────────────────────────────────────────
// COMPONENTE PRINCIPAL: Card
// É o "contentor" — a caixa branca com sombra e cantos arredondados.
// Sozinho não tem estrutura interna definida; é combinado com os
// subcomponentes abaixo (CardHeader, CardTitle, etc.) para dar consistência.
// ─────────────────────────────────────────────
export default function Card({
  children,
  className = "",
  hoverable = true, // por padrão, os cards reagem ao hover (a maioria vai ser clicável)
}: CardProps) {
  return (
    <div
      className={`bg-white rounded-xl border border-gray-100 shadow-sm p-6 transition-all duration-200 ease-out ${
        // Se hoverable for true, adiciona sombra maior + move o card ligeiramente para cima ao passar o rato.
        // Se for false (ex: um card puramente informativo, não clicável), não aplica nenhum efeito.
        hoverable ? "hover:shadow-md hover:-translate-y-1" : ""
      } ${className}`}
      // className extra é sempre adicionado no fim, para poder sobrepor/complementar estilos quando necessário
    >
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────
// SUBCOMPONENTES
// Cada um representa uma "zona" comum dentro de um Card (cabeçalho, título, etc.).
// Existem para que todos os cards do site (fichas de projeto, notícias, etc.)
// usem a mesma estrutura e espaçamento, em vez de cada página inventar o seu próprio layout.
//
// Uso típico:
// <Card>
//   <CardHeader>
//     <CardTitle>Título do projeto</CardTitle>
//     <CardDescription>Categoria · Setor</CardDescription>
//   </CardHeader>
//   <CardContent>Texto descritivo...</CardContent>
//   <CardFooter>
//     <span>Info extra</span>
//     <Button size="sm">Ver mais</Button>
//   </CardFooter>
// </Card>
// ─────────────────────────────────────────────

// Zona do topo do card — normalmente contém o CardTitle e o CardDescription
export function CardHeader({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
  // mb-4 = espaço abaixo, separando o cabeçalho do conteúdo que vem a seguir
}

// Título principal do card (ex: nome do projeto, título da notícia)
export function CardTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <h3 className={`text-lg font-bold text-gray-900 ${className}`}>{children}</h3>;
  // <h3> em vez de <h1>/<h2> porque, semanticamente, o título de um card
  // costuma estar "dentro" da hierarquia da página (abaixo do título principal dela)
}

// Texto secundário/descritivo, normalmente logo abaixo do título (ex: categoria, subtítulo)
export function CardDescription({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-sm text-gray-500 mt-1 ${className}`}>{children}</p>;
  // text-gray-500 = cor mais apagada, para não competir visualmente com o título
}

// Corpo principal do card — o conteúdo/texto descritivo mais longo
export function CardContent({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`text-sm text-gray-700 ${className}`}>{children}</div>;
}

// Zona do fundo do card — normalmente contém ações (botões) ou metadados finais
export function CardFooter({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mt-4 pt-4 border-t border-gray-100 flex items-center justify-between ${className}`}>
      {children}
    </div>
    // border-t = linha fina a separar o footer do conteúdo acima
    // flex items-center justify-between = organiza os itens do footer lado a lado,
    // com espaço entre eles (útil para "texto à esquerda + botão à direita", por exemplo)
  );
}