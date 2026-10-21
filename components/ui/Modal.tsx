"use client";
// Necessário: usa useEffect (para fechar com a tecla Esc) e interatividade (clique para fechar)

import { ReactNode, useEffect } from "react";

type ModalProps = {
  isOpen: boolean;        // controla se o modal está visível — o estado vive no componente que o usa
  onClose: () => void;    // função chamada para fechar o modal (clique fora, Esc, ou botão "X")
  title?: string;
  children: ReactNode;
};

// Janela sobreposta ao conteúdo da página, usada para confirmações, detalhes rápidos,
// ou formulários curtos sem sair da página atual.
//
// Uso:
// const [aberto, setAberto] = useState(false);
// <Modal isOpen={aberto} onClose={() => setAberto(false)} title="Confirmar">
//   Conteúdo aqui...
// </Modal>
export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  // Fecha o modal automaticamente se o utilizador premir a tecla Esc
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden"; // impede scroll da página por trás do modal
    }
    // Função de limpeza: remove o listener e restaura o scroll quando o modal fecha
    // ou o componente é desmontado — evita fugas de memória e bugs de scroll bloqueado
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  // Se não estiver aberto, não renderiza nada — padrão comum em React
  if (!isOpen) return null;

  return (
    // Camada de fundo escura semitransparente, cobre o ecrã todo
    <div
      className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4"
      onClick={onClose} // clicar fora da caixa branca fecha o modal
    >
      {/* Caixa branca do modal em si */}
      <div
        className="bg-white rounded-xl shadow-xl max-w-[1000px] w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        // stopPropagation impede que um clique DENTRO da caixa "suba" até ao fundo
        // e feche o modal por engano — só clicar fora (no fundo escuro) fecha
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          {title && <h3 className="text-lg font-bold text-gray-900">{title}</h3>}
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="text-gray-400 hover:text-gray-700 transition-colors ml-auto"
          >
            {/* Ícone "X" simples, desenhado diretamente aqui (uso único, não vale a pena estar em Icons.tsx) */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}