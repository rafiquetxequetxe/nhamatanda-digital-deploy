"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { IconSend } from "@/components/ui/Icons";
import Alert, { type AlertType } from "@/components/ui/Alert";

const fieldClass = "min-h-12 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-3 text-base text-[#102344] outline-none transition placeholder:text-slate-400 focus:border-[#166B45] focus:ring-2 focus:ring-[#166B45]/15 disabled:bg-slate-50";
const labelClass = "mb-2 block text-sm font-semibold text-[#102344]";

export default function ContactForm() {
  const id = useId();
  const submitting = useRef(false);
  const [enviando, setEnviando] = useState(false);
  const [alertaAberto, setAlertaAberto] = useState<AlertType | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    const formData = new FormData(form);
    submitting.current = true;
    setEnviando(true);
    setAlertaAberto(null);
    try {
      const response = await fetch("https://formspree.io/f/mppalznq", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Falha no envio");
      form.reset();
      setAlertaAberto("sucesso");
    } catch {
      // Preserva o que foi escrito para permitir uma nova tentativa.
      setAlertaAberto("erro");
    } finally {
      submitting.current = false;
      setEnviando(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} aria-busy={enviando} aria-describedby={`${id}-required`}>
        <input type="hidden" name="_subject" value="Nova mensagem de contacto - Nhamatanda Digital" />
        <p id={`${id}-required`} className="mb-5 text-xs leading-5 text-slate-500">Campos obrigatórios assinalados com <span className="text-red-600">*</span></p>
        <fieldset disabled={enviando} className="m-0 min-w-0 space-y-5 border-0 p-0">
          <legend className="sr-only">Dados da mensagem</legend>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor={`${id}-nome`} className={labelClass}>Nome completo <span aria-hidden="true" className="text-red-600">*</span></label>
              <input id={`${id}-nome`} type="text" name="nome" autoComplete="name" required className={fieldClass} />
            </div>
            <div>
              <label htmlFor={`${id}-email`} className={labelClass}>Email <span aria-hidden="true" className="text-red-600">*</span></label>
              <input id={`${id}-email`} type="email" name="email" autoComplete="email" required className={fieldClass} />
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor={`${id}-tema`} className={labelClass}>Tema do contacto <span aria-hidden="true" className="text-red-600">*</span></label>
              <select id={`${id}-tema`} name="tema" defaultValue="" required className={fieldClass}>
                <option value="" disabled>Seleccione um tema</option>
                <option value="Informação geral">Informação geral</option>
                <option value="Serviços e atendimento">Serviços e atendimento</option>
                <option value="Investimento">Investimento</option>
                <option value="Sugestão">Sugestão</option>
                <option value="Reclamação">Reclamação</option>
                <option value="Outro assunto">Outro assunto</option>
              </select>
            </div>
            <div>
              <label htmlFor={`${id}-assunto`} className={labelClass}>Assunto <span aria-hidden="true" className="text-red-600">*</span></label>
              <input id={`${id}-assunto`} type="text" name="assunto" required className={fieldClass} />
            </div>
          </div>
          <div>
            <label htmlFor={`${id}-mensagem`} className={labelClass}>Mensagem <span aria-hidden="true" className="text-red-600">*</span></label>
            <textarea id={`${id}-mensagem`} name="mensagem" required rows={7} placeholder="Descreva o seu pedido ou questão…" aria-describedby={`${id}-privacy`} className={`${fieldClass} min-h-[190px] resize-y leading-7`} />
          </div>
          <div className="flex flex-col items-stretch gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
            <p id={`${id}-privacy`} className="max-w-[290px] text-xs leading-5 text-slate-500">Evite incluir dados sensíveis ou documentos pessoais não solicitados.</p>
            <button type="submit" disabled={enviando} className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-lg bg-[#166B45] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#125637] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#166B45] disabled:cursor-wait disabled:opacity-60">
              {enviando ? "A enviar…" : "Enviar mensagem"}
              {!enviando && <span aria-hidden="true"><IconSend size={17} /></span>}
            </button>
          </div>
        </fieldset>
        <p role="status" aria-live="polite" className="sr-only">{enviando ? "A enviar a sua mensagem." : alertaAberto === "sucesso" ? "Mensagem enviada com sucesso." : alertaAberto === "erro" ? "Não foi possível enviar. Os campos foram preservados." : ""}</p>
      </form>
      <Alert isOpen={alertaAberto === "sucesso"} type="sucesso" title="Mensagem enviada" message="Obrigado! A sua mensagem foi enviada com sucesso." onClose={() => setAlertaAberto(null)} />
      <Alert isOpen={alertaAberto === "erro"} type="erro" title="Erro no envio" message="Não foi possível enviar a sua mensagem. Os dados foram mantidos. Tente novamente." onClose={() => setAlertaAberto(null)} />
    </>
  );
}
