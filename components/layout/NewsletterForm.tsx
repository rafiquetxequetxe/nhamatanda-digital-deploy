"use client";

import { useState } from "react";
import Alert, { type AlertType }  from "@/components/ui/Alert";



export default function NewsletterForm() {
  const [enviando, setEnviando] = useState(false);
  const [alertaAberto, setAlertaAberto] = useState<AlertType | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEnviando(true);

    const form = e.currentTarget; // ← guarda a referência ANTES do await
    const formData = new FormData(form);
    formData.set("_subject", "Nova subscrição à Newsletter - Nhamatanda Digital");

    let sucesso = false;
    try {
      const response = await fetch("https://formspree.io/f/mgawzeqv", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      sucesso = response.ok
      if (sucesso) form.reset();       
    } catch {
      sucesso = false;
    }

    setEnviando(false);
    setAlertaAberto(sucesso ? "sucesso" : "erro");
  }

  return (
    <>
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="email"
        name="email"
        required
        placeholder="O seu email"
        className="rounded-md px-4 py-3 text-sm text-gray-800 bg-white outline-none"
      />
      <button
        type="submit"
        disabled={enviando}
        className="bg-[#1F6F4A] hover:bg-[#185939] disabled:opacity-60 text-white text-sm font-medium rounded-md py-3 transition-colors"
      >
        {enviando ? "A subscrever..." : "Subscrever"}
      </button>
    </form>

    <Alert 
    isOpen={alertaAberto === "sucesso"}
    type ="sucesso"
    title="Subscrição bem-sucedida!"
    message="Obrigado por subscrever a nossa newsletter!"
    onClose={() => setAlertaAberto(null)}/>

    <Alert 
    isOpen={alertaAberto === "erro"}
    type ="erro"
    title="Erro na subscrição"
    message="Ocorreu um erro ao tentar subscrever. Por favor, tente novamente."
    onClose={() => setAlertaAberto(null)}/>
    </>
  );
}