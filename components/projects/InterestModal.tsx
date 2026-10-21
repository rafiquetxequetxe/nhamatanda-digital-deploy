"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import Modal from "@/components/ui/Modal";
import Alert from "@/components/ui/Alert";

type InterestModalProps = {
  isOpen: boolean;
  onClose: () => void;
  projetoTitulo: string;
  projetoSlug: string;
};

const campo =
  "mt-1.5 w-full rounded-lg border border-slate-200 bg-white " +
  "px-3.5 py-3 text-sm text-slate-800 outline-none " +
  "placeholder:text-slate-400 focus:border-[#1F6F4A] " +
  "focus:ring-1 focus:ring-[#1F6F4A] disabled:bg-slate-50";

const rotulo = "block text-sm font-semibold text-slate-700";

export default function InterestModal({
  isOpen,
  onClose,
  projetoTitulo,
  projetoSlug,
}: InterestModalProps) {
  const id = useId();
  const envioEmCurso = useRef(false);

  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucessoAberto, setSucessoAberto] = useState(false);

  function fechar() {
    if (envioEmCurso.current) return;

    setErro("");
    onClose();
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (envioEmCurso.current) return;

    const form = e.currentTarget;
    const formData = new FormData(form);

    envioEmCurso.current = true;
    setEnviando(true);
    setErro("");

    let enviado = false;

    try {
      const response = await fetch("https://formspree.io/f/xgawyvzr", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        enviado = true;
        form.reset();
      } else {
        setErro(
          response.status === 429
            ? "Foram feitas várias tentativas de envio. Aguarde um momento e tente novamente."
            : "O serviço não confirmou o envio. Os campos continuam preenchidos para poder tentar novamente.",
        );
      }
    } catch {
      setErro(
        "Não foi possível confirmar o envio. Verifique a sua ligação à internet antes de tentar novamente.",
      );
    } finally {
      envioEmCurso.current = false;
      setEnviando(false);
    }

    if (enviado) {
      onClose();
      setSucessoAberto(true);
    }
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={fechar}
        title="Manifestar interesse"
      >
        <form
          onSubmit={handleSubmit}
          aria-busy={enviando}
          className="space-y-5"
        >
          {/* Oportunidade seleccionada */}
          <div className="rounded-xl border border-[#dce9e1] bg-[#f0f7f3] px-4 py-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#1F6F4A]">
              Oportunidade seleccionada
            </p>

            <p className="mt-1.5 text-base font-bold leading-6 text-[#102344]">
              {projetoTitulo}
            </p>
          </div>

          <p className="text-sm leading-6 text-slate-600">
            Apresente o seu interesse ou peça informações sobre esta
            oportunidade. Os campos assinalados com * são obrigatórios.
          </p>

          <input
            type="hidden"
            name="projeto"
            value={projetoTitulo}
          />

          <input
            type="hidden"
            name="projeto_slug"
            value={projetoSlug}
          />

          <input
            type="hidden"
            name="_subject"
            value={`Manifestação de interesse: ${projetoTitulo}`}
          />

          <fieldset
            disabled={enviando}
            className="m-0 min-w-0 space-y-4 border-0 p-0"
          >
            <legend className="sr-only">
              Dados de contacto e interesse
            </legend>

            <div>
              <label htmlFor={`${id}-nome`} className={rotulo}>
                Nome completo *
              </label>

              <input
                id={`${id}-nome`}
                type="text"
                name="nome"
                autoComplete="name"
                required
                maxLength={150}
                placeholder="Como se chama?"
                className={campo}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor={`${id}-email`} className={rotulo}>
                  Email *
                </label>

                <input
                  id={`${id}-email`}
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  placeholder="nome@exemplo.com"
                  className={campo}
                />
              </div>

              <div>
                <label htmlFor={`${id}-telefone`} className={rotulo}>
                  Telefone{" "}
                  <span className="font-normal text-slate-500">
                    (opcional)
                  </span>
                </label>

                <input
                  id={`${id}-telefone`}
                  type="tel"
                  name="telefone"
                  autoComplete="tel"
                  maxLength={40}
                  placeholder="+258 …"
                  className={campo}
                />
              </div>
            </div>

            <div>
              <label htmlFor={`${id}-empresa`} className={rotulo}>
                Empresa / organização{" "}
                <span className="font-normal text-slate-500">
                  (opcional)
                </span>
              </label>

              <input
                id={`${id}-empresa`}
                type="text"
                name="empresa"
                autoComplete="organization"
                maxLength={200}
                placeholder="Nome da empresa ou organização"
                className={campo}
              />
            </div>

            <div>
              <label htmlFor={`${id}-objectivo`} className={rotulo}>
                Como podemos ajudar?
              </label>

              <select
                id={`${id}-objectivo`}
                name="objectivo"
                defaultValue="Solicitar mais informações"
                className={campo}
              >
                <option value="Solicitar mais informações">
                  Quero receber mais informações
                </option>

                <option value="Conhecer condições de participação">
                  Quero conhecer as condições de participação
                </option>

                <option value="Apresentar interesse em investir">
                  Quero apresentar o meu interesse em investir
                </option>

                <option value="Outro assunto">
                  Outro assunto
                </option>
              </select>
            </div>

            <div>
              <label htmlFor={`${id}-mensagem`} className={rotulo}>
                A sua mensagem{" "}
                <span className="font-normal text-slate-500">
                  (opcional)
                </span>
              </label>

              <textarea
                id={`${id}-mensagem`}
                name="mensagem"
                rows={4}
                maxLength={5000}
                aria-describedby={`${id}-mensagem-ajuda`}
                placeholder="Conte-nos o que pretende conhecer ou como gostaria de participar."
                className={`${campo} min-h-[110px] resize-y`}
              />

              <p
                id={`${id}-mensagem-ajuda`}
                className="mt-1.5 text-xs leading-5 text-slate-500"
              >
                Nesta fase, não precisa de enviar documentos pessoais
                nem informações financeiras confidenciais.
              </p>
            </div>
          </fieldset>

          {erro && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-800"
            >
              {erro}
            </div>
          )}

          <div className="border-t border-slate-100 pt-4">
            <button
              type="submit"
              disabled={enviando}
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#1F6F4A] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#185939] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F6F4A] disabled:cursor-wait disabled:opacity-70"
            >
              {enviando ? "A enviar…" : "Enviar manifestação de interesse"}

              {!enviando && <span aria-hidden="true">→</span>}
            </button>

            <p
              role="status"
              className="mt-2 text-center text-xs leading-5 text-slate-500"
            >
              {enviando
                ? "Aguarde enquanto confirmamos o envio."
                : "Confirme o seu email antes de enviar."}
            </p>
          </div>
        </form>
      </Modal>

      <Alert
        isOpen={sucessoAberto}
        type="sucesso"
        title="Mensagem enviada"
        message={`A sua manifestação de interesse em “${projetoTitulo}” foi enviada com sucesso. Obrigado pelo seu contacto.`}
        onClose={() => setSucessoAberto(false)}
      />
    </>
  );
}