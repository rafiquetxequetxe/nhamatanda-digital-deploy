"use client";

import { useState } from "react";
import Image from "next/image";
import s from "./opportunity-detail.module.css";

type Props = {
  imagemPrincipal: string;
  galeria?: string[];
  titulo: string;
};

export default function OpportunityGallery({ imagemPrincipal, galeria = [], titulo }: Props) {
  const imagens = [...new Set([imagemPrincipal, ...galeria].map(src => src?.trim()).filter((src): src is string => Boolean(src)))];
  const [falhas, setFalhas] = useState<string[]>([]);
  const [escolhida, setEscolhida] = useState(imagemPrincipal);
  const disponiveis = imagens.filter(src => !falhas.includes(src));
  const actual = disponiveis.includes(escolhida) ? escolhida : disponiveis[0];
  const indice = disponiveis.indexOf(actual);

  function remover(src: string) {
    setFalhas(current => current.includes(src) ? current : [...current, src]);
  }

  return (
    <div className={s.gallery} role="group" aria-label={`Imagens de ${titulo}`}>
      <div className={s.mainImage}>
        {actual ? (
          <Image
            key={actual}
            src={actual}
            alt={`${titulo} — imagem ${indice + 1}`}
            fill
            priority
            unoptimized
            sizes="(max-width: 959px) 100vw, 65vw"
            onError={() => remover(actual)}
          />
        ) : (
          <div className={s.imageFallback} role="status">
            <svg aria-hidden="true" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="3" y="3" width="18" height="18" rx="3" /><circle cx="8" cy="8" r="1.5" /><path d="m3 17 5-5 4 4 4-6 5 7" /></svg>
            <span>Imagem indisponível</span>
          </div>
        )}
      </div>
      {disponiveis.length > 1 && (
        <div className={s.thumbnails} aria-label="Escolher imagem">
          {disponiveis.map((src, index) => (
            <button
              key={src}
              type="button"
              aria-label={`Mostrar imagem ${index + 1} de ${titulo}`}
              aria-pressed={src === actual}
              onClick={() => setEscolhida(src)}
            >
              <Image src={src} alt="" fill unoptimized sizes="(max-width: 600px) 30vw, 240px" onError={() => remover(src)} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}