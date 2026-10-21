"use client";

import { useState } from "react";
import Image from "next/image";

type ProjectGalleryProps = {
  imagemPrincipal: string;
  galeria?: string[];
  titulo: string;
};

// Imagem grande + miniaturas clicáveis por baixo. Clicar numa miniatura
// troca a imagem principal (não abre modal — é diferente do ZoomableImage,
// aqui o objetivo é "escolher qual mostrar em grande", não ampliar).
export default function ProjectGallery({ imagemPrincipal, galeria, titulo }: ProjectGalleryProps) {
  const todasImagens = galeria && galeria.length > 0 ? galeria : [imagemPrincipal];
  const [selecionada, setSelecionada] = useState(0);

  return (
    <div>
      <div className="relative w-full h-[380px] rounded-xl overflow-hidden bg-gray-100 mb-4">
        <Image
          src={todasImagens[selecionada]}
          alt={titulo}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 70vw"
          priority
        />
      </div>

      {todasImagens.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {todasImagens.map((img, index) => (
            <button
              key={img + index}
              onClick={() => setSelecionada(index)}
              className={`relative w-full h-[90px] rounded-lg overflow-hidden bg-gray-100 border-2 transition-colors ${
                selecionada === index ? "border-[#1F6F4A]" : "border-transparent hover:border-gray-200"
              }`}
            >
              <Image
                src={img}
                alt={`${titulo} - imagem ${index + 1}`}
                fill
                className="object-cover"
                sizes="150px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}