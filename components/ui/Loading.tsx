type LoadingProps = {
  size?: "sm" | "md" | "lg";
  label?: string; // texto opcional ao lado do spinner (ex: "A enviar...")
  className?: string;
};

const sizeMap = {
  sm: "w-4 h-4 border-2",
  md: "w-8 h-8 border-2",
  lg: "w-12 h-12 border-[3px]",
};

// Indicador de carregamento (spinner). Usado, por exemplo, enquanto o formulário
// de contacto está a enviar dados, ou enquanto uma página aguarda dados.
// Uso: <Loading size="sm" label="A enviar..." />
export default function Loading({ size = "md", label, className = "" }: LoadingProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        className={`${sizeMap[size]} border-gray-200 border-t-[#1F6F4A] rounded-full animate-spin`}
        // border-gray-200 = cor de fundo do círculo; border-t-[#1F6F4A] = só o topo colorido,
        // o que cria o efeito visual de "rodar" quando combinado com animate-spin
        role="status"
        aria-label="A carregar"
      />
      {label && <span className="text-sm text-gray-500">{label}</span>}
    </div>
  );
}

// Versão de página inteira — usada quando uma página inteira está a carregar dados
// (ex: Next.js loading.tsx automático), em vez de um botão isolado.
export function LoadingPage({ label = "A carregar..." }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      <Loading size="lg" />
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}