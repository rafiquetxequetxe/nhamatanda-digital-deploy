"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function ScrollNavigation() {
  const pathname = usePathname();
  const [posicao, setPosicao] = useState({ visivel: false, subir: false });

  useEffect(() => {
    let frame = 0;
    function actualizar() {
      frame = 0;
      const pagina = document.scrollingElement ?? document.documentElement;
      const limite = Math.max(0, pagina.scrollHeight - pagina.clientHeight);
      const visivel = limite > 80;
      const subir = pagina.scrollTop >= Math.min(pagina.clientHeight * 0.8, limite / 2);
      setPosicao(anterior => anterior.visivel === visivel && anterior.subir === subir ? anterior : { visivel, subir });
    }
    function agendar() {
      if (!frame) frame = window.requestAnimationFrame(actualizar);
    }
    const observer = new ResizeObserver(agendar);
    observer.observe(document.body);
    observer.observe(document.documentElement);
    window.addEventListener("scroll", agendar, { passive: true });
    window.addEventListener("resize", agendar);
    agendar();
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", agendar);
      window.removeEventListener("resize", agendar);
    };
  }, [pathname]);

  function navegar() {
    const pagina = document.scrollingElement ?? document.documentElement;
    const movimentoReduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: posicao.subir ? 0 : pagina.scrollHeight - pagina.clientHeight, behavior: movimentoReduzido ? "instant" : "smooth" });
  }

  if (!posicao.visivel) return null;

  const descricao = posicao.subir ? "Voltar ao início da página" : "Ir para o fim da página";

  return (
    <button type="button" onClick={navegar} aria-label={descricao} title={descricao} className="fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[var(--portal-green,#166b45)] text-white shadow-md transition-colors hover:bg-[var(--portal-green-hover,#104f34)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--portal-green,#166b45)] motion-reduce:transition-none print:hidden sm:right-6">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={posicao.subir ? "M12 19V5M5 12l7-7 7 7" : "M12 5v14M5 12l7 7 7-7"} /></svg>
    </button>
  );
}
