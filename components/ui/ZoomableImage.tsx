"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  IconX,
  IconChevronLeft,
  IconChevronRight,
} from "@/components/ui/Icons";

type ZoomableImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  fill?: boolean;

  // Galeria opcional
  gallery?: string[];

  // Índice inicial quando a imagem pertence a uma galeria
  initialIndex?: number;
};

export default function ZoomableImage({
  src,
  alt,
  className = "",
  sizes = "100vw",
  fill = true,
  gallery,
  initialIndex = 0,
}: ZoomableImageProps) {

  /*
   * Se existir uma galeria, usamos todas as imagens.
   * Caso contrário, o componente continua a funcionar
   * exactamente como antes, com uma única imagem.
   */
  const imagens =
    gallery && gallery.length > 0
      ? gallery
      : [src];

  const indiceInicial =
    gallery && gallery.includes(src)
      ? gallery.indexOf(src)
      : initialIndex;

  const [aberta, setAberta] = useState(false);
  const [indice, setIndice] = useState(indiceInicial);

  const imagemAtual = imagens[indice];

  /* =====================================================
     ABRIR
  ====================================================== */

  function abrir() {
    setIndice(indiceInicial);
    setAberta(true);
  }

  /* =====================================================
     FECHAR
  ====================================================== */

  function fechar() {
    setAberta(false);
  }

  /* =====================================================
     ANTERIOR
  ====================================================== */

  function anterior() {
    setIndice((atual) =>
      atual === 0
        ? imagens.length - 1
        : atual - 1
    );
  }

  /* =====================================================
     PRÓXIMA
  ====================================================== */

  function seguinte() {
    setIndice((atual) =>
      atual === imagens.length - 1
        ? 0
        : atual + 1
    );
  }

  /* =====================================================
     TECLADO + BLOQUEIO DO SCROLL
  ====================================================== */

  useEffect(() => {
    if (!aberta) return;

    function handleKeyDown(event: KeyboardEvent) {

      if (event.key === "Escape") {
        fechar();
      }

      if (
        event.key === "ArrowLeft" &&
        imagens.length > 1
      ) {
        anterior();
      }

      if (
        event.key === "ArrowRight" &&
        imagens.length > 1
      ) {
        seguinte();
      }
    }

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    // Impede o scroll da página enquanto a galeria está aberta
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.body.style.overflow = "";
    };
  }, [aberta, imagens.length]);

  return (
    <>
      {/* =====================================================
          MINIATURA
      ====================================================== */}

      <button
        type="button"
        onClick={abrir}
        className={`
          relative
          block
          w-full
          h-full
          cursor-zoom-in
          ${className}
        `}
        aria-label={`Ampliar imagem: ${alt}`}
      >
        <Image
          src={src}
          alt={alt}
          fill={fill}
          className="object-cover"
          sizes={sizes}
        />
      </button>


      {/* =====================================================
          VISUALIZADOR FULLSCREEN
      ====================================================== */}

      {aberta && (
        <div
          className="
            fixed
            inset-0
            z-[9999]
            bg-black
            flex
            items-center
            justify-center
          "
          role="dialog"
          aria-modal="true"
          aria-label="Visualizador de imagens"
        >

          {/* =================================================
              IMAGEM
          ================================================== */}

          <div className="absolute inset-0 flex items-center justify-center">

            <Image
              key={imagemAtual}
              src={imagemAtual}
              alt={`${alt} — imagem ${indice + 1}`}
              fill
              sizes="100vw"
              className="
                object-contain
                select-none
              "
              priority
            />

          </div>


          {/* =================================================
              GRADIENTE SUPERIOR
          ================================================== */}

          <div
            className="
              absolute
              top-0
              left-0
              right-0
              h-24
              bg-gradient-to-b
              from-black/60
              to-transparent
              pointer-events-none
            "
          />


          {/* =================================================
              CONTADOR
          ================================================== */}

          {imagens.length > 1 && (
            <div
              className="
                absolute
                top-5
                left-1/2
                -translate-x-1/2
                z-30
                px-4
                py-2
                rounded-full
                bg-black/50
                backdrop-blur-sm
                text-white
                text-sm
                font-medium
              "
            >
              {indice + 1} / {imagens.length}
            </div>
          )}


          {/* =================================================
              FECHAR
          ================================================== */}

          <button
            type="button"
            onClick={fechar}
            aria-label="Fechar imagem"
            className="
              absolute
              top-4
              right-4
              z-40
              flex
              items-center
              justify-center
              w-11
              h-11
              rounded-full
              bg-black/50
              text-white
              backdrop-blur-sm
              hover:bg-black/75
              transition-all
            "
          >
            <IconX size={22} />
          </button>


          {/* =================================================
              ANTERIOR
          ================================================== */}

          {imagens.length > 1 && (
            <button
              type="button"
              onClick={anterior}
              aria-label="Imagem anterior"
              className="
                absolute
                left-4
                lg:left-8
                top-1/2
                -translate-y-1/2
                z-30
                flex
                items-center
                justify-center
                w-12
                h-12
                lg:w-14
                lg:h-14
                rounded-full
                bg-black/45
                text-white
                backdrop-blur-sm
                hover:bg-black/75
                hover:scale-105
                transition-all
              "
            >
              <IconChevronLeft size={28} />
            </button>
          )}


          {/* =================================================
              SEGUINTE
          ================================================== */}

          {imagens.length > 1 && (
            <button
              type="button"
              onClick={seguinte}
              aria-label="Próxima imagem"
              className="
                absolute
                right-4
                lg:right-8
                top-1/2
                -translate-y-1/2
                z-30
                flex
                items-center
                justify-center
                w-12
                h-12
                lg:w-14
                lg:h-14
                rounded-full
                bg-black/45
                text-white
                backdrop-blur-sm
                hover:bg-black/75
                hover:scale-105
                transition-all
              "
            >
              <IconChevronRight size={28} />
            </button>
          )}


          {/* =================================================
              ZONAS DE CLIQUE
              Clique no lado esquerdo/direito da imagem
          ================================================== */}

          {imagens.length > 1 && (
            <>
              <button
                type="button"
                onClick={anterior}
                aria-label="Imagem anterior"
                className="
                  absolute
                  left-0
                  top-0
                  bottom-0
                  w-1/4
                  z-10
                  cursor-w-resize
                "
              />

              <button
                type="button"
                onClick={seguinte}
                aria-label="Próxima imagem"
                className="
                  absolute
                  right-0
                  top-0
                  bottom-0
                  w-1/4
                  z-10
                  cursor-e-resize
                "
              />
            </>
          )}


          {/* =================================================
              MINIATURAS
          ================================================== */}

          {imagens.length > 1 && (
            <div
              className="
                absolute
                bottom-5
                left-1/2
                -translate-x-1/2
                z-30
                flex
                gap-2
                max-w-[90vw]
                overflow-x-auto
                rounded-xl
                bg-black/45
                backdrop-blur-md
                p-2
              "
            >
              {imagens.map((imagem, index) => (
                <button
                  key={`${imagem}-${index}`}
                  type="button"
                  onClick={() => setIndice(index)}
                  aria-label={`Ver imagem ${index + 1}`}
                  className={`
                    relative
                    shrink-0
                    w-20
                    h-14
                    overflow-hidden
                    rounded-md
                    transition-all
                    ${
                      index === indice
                        ? "ring-2 ring-white scale-105"
                        : "opacity-60 hover:opacity-100"
                    }
                  `}
                >
                  <Image
                    src={imagem}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}

        </div>
      )}
    </>
  );
}