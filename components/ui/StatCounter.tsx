"use client";

import { useState, useRef } from "react";

type StatCounterProps = {
  valor: string; // ex: "85.123" ou "2.297 km²" — pode ter texto misturado com números
  duracao?: number; // duração da animação em milissegundos
};

// Extrai só a parte numérica do valor (ex: de "2.297 km²" tira 2297),
// para saber até onde contar, mantendo o resto do texto (unidade, sufixo) fixo.
function extrairNumero(valor: string): { numero: number; prefixo: string; sufixo: string } {
  const match = valor.match(/^([^\d]*)([\d.,]+)(.*)$/);
  if (!match) return { numero: 0, prefixo: "", sufixo: valor };

  const [, prefixo, numeroTexto, sufixo] = match;
  // Remove pontos/vírgulas usados como separador de milhar, para obter o número real
  const numero = parseInt(numeroTexto.replace(/[.,]/g, ""), 10);

  return { numero, prefixo, sufixo };
}

// Formata o número de volta com separador de milhar (formato português: 85.123)
function formatarNumero(n: number): string {
  return n.toLocaleString("pt-PT");
}

// Mostra um valor estático, mas ao passar o rato, conta rapidamente de 0
// até ao valor real, com uma desaceleração suave no final.
export default function StatCounter({ valor, duracao = 1200 }: StatCounterProps) {
  const { numero, prefixo, sufixo } = extrairNumero(valor);
  const [display, setDisplay] = useState(valor); // valor mostrado (começa já no valor final, estático)
  const animando = useRef(false); // evita disparar a animação várias vezes seguidas

  function iniciarContagem() {
    if (animando.current) return; // já está a animar, ignora novo hover
    animando.current = true;

    const inicio = performance.now();

    function passo(agora: number) {
      const progresso = Math.min((agora - inicio) / duracao, 1);
      // easeOutQuad: começa rápido, desacelera no fim — sensação mais natural que linear
      const progressoSuavizado = 1 - (1 - progresso) * (1 - progresso);
      const valorAtual = Math.round(numero * progressoSuavizado);

      setDisplay(`${prefixo}${formatarNumero(valorAtual)}${sufixo}`);

      if (progresso < 1) {
        requestAnimationFrame(passo);
      } else {
        setDisplay(valor); // garante que termina exatamente no valor original (com formatação certa)
        animando.current = false;
      }
    }

    requestAnimationFrame(passo);
  }

  return (
    <p
      className="text-2xl font-bold text-gray-900"
      onMouseEnter={iniciarContagem}
    >
      {display}
    </p>
  );
}