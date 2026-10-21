"use client";

import { ReactNode, useEffect } from "react";

// Tipos de alerta suportados — cobre os mesmos casos do exemplo em JS (SweetAlert2)
export type AlertType = "sucesso" | "erro" | "informacao" | "confirmacao";

type AlertProps = {
  isOpen: boolean;
  type: AlertType;
  title?: string;
  message: string;
  onClose: () => void;

  // Só usados quando type === "confirmacao" — equivalem ao showCancelButton
  // + confirmButtonText/cancelButtonText do SweetAlert2
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
};

// Configuração visual de cada tipo: cor, ícone e título padrão
// (evita repetir "if/else" no JSX principal)
const config: Record  <
AlertType,
  { corFundo: string; corIcone: string; tituloPadrao: string; icon: ReactNode }
> = {
  sucesso: {
    corFundo: "bg-green-50",
    corIcone: "text-green-600",
    tituloPadrao: "Sucesso",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <path d="M8 12l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  erro: {
    corFundo: "bg-red-50",
    corIcone: "text-red-600",
    tituloPadrao: "Erro",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  informacao: {
    corFundo: "bg-blue-50",
    corIcone: "text-blue-600",
    tituloPadrao: "Informação",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <path d="M12 8h.01M11 12h1v4h1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  confirmacao: {
    corFundo: "bg-amber-50",
    corIcone: "text-amber-600",
    tituloPadrao: "Confirmação",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <path d="M12 16h.01M12 8v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
};

// Alerta modal com ícone, mensagem e botões — equivalente funcional ao
// exibirMensagem()/SweetAlert2 do exemplo em JavaScript puro.
//
// Uso — informação/erro/sucesso (fecha sozinho ao clicar "OK"):
//   <Alert isOpen={aberto} type="sucesso" message="Mensagem enviada!" onClose={() => setAberto(false)} />
//
// Uso — confirmação (dois botões, Sim/Não):
//   <Alert
//     isOpen={aberto}
//     type="confirmacao"
//     message="Tem a certeza que quer apagar?"
//     onConfirm={() => { apagar(); setAberto(false); }}
//     onClose={() => setAberto(false)}
//   />
export default function Alert({
  isOpen,
  type,
  title,
  message,
  onClose,
  onConfirm,
  confirmText = "Sim",
  cancelText = "Não",
}: AlertProps) {
  // Fecha com a tecla Esc, igual ao Modal.tsx
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const { corFundo, corIcone, tituloPadrao, icon } = config[type];

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl max-w-[600px] w-full p-6 text-center"
        onClick={(e) => e.stopPropagation()} // impede que clicar dentro feche o alerta
      >
        {/* Círculo colorido com o ícone do tipo de alerta */}
        <div className={`w-14 h-14 rounded-full ${corFundo} ${corIcone} flex items-center justify-center mx-auto mb-4`}>
          {icon}
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-1">{title ?? tituloPadrao}</h3>
        <p className="text-md text-gray-600 mb-6">{message}</p>

        {type === "confirmacao" ? (
          // Confirmação: dois botões lado a lado (Sim / Não)
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 border-2 border-gray-200 text-gray-700 rounded-lg py-2.5 text-md font-medium hover:bg-gray-50 transition-colors"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 bg-[#1F6F4A] text-white rounded-lg py-2.5 text-md font-medium hover:bg-[#185939] transition-colors"
            >
              {confirmText}
            </button>
          </div>
        ) : (
          // Sucesso/Erro/Informação: um único botão "OK" que fecha o alerta
          <button
            onClick={onClose}
            className="w-full bg-[#1F6F4A] text-white rounded-lg py-2.5 text-md font-medium hover:bg-[#185939] transition-colors"
          >
            OK
          </button>
        )}
      </div>
    </div>
  );
}