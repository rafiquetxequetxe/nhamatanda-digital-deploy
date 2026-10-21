"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconArrowRight, IconChevronLeft, IconChevronRight } from "@/components/ui/Icons";
import s from "./home-intro.module.css";

type Slide = {
  eyebrow: string;
  imagem: string;
  titulo: string;
  subtitulo: string;
  subtitulo2?: string;
  botao: { texto: string; href: string };
};

type HeroCarouselProps = { slides: Slide[] };

export default function HeroCarousel({ slides }: HeroCarouselProps) {
  const [slideAtual, setSlideAtual] = useState(0);
  const [pausado, setPausado] = useState(false);
  const [interagindo, setInteragindo] = useState(false);
  const [focado, setFocado] = useState(false);
  const [movimentoReduzido, setMovimentoReduzido] = useState(false);
  const quantidade = slides.length;
  const atual = quantidade ? slideAtual % quantidade : 0;
  const parado = pausado || interagindo || focado || movimentoReduzido;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const actualizar = () => setMovimentoReduzido(media.matches);
    actualizar();
    media.addEventListener("change", actualizar);
    return () => media.removeEventListener("change", actualizar);
  }, []);

  useEffect(() => {
    if (quantidade <= 1 || parado) return;
    const intervalo = window.setInterval(() => setSlideAtual(valor => (valor + 1) % quantidade), 6000);
    return () => window.clearInterval(intervalo);
  }, [quantidade, parado]);

  function seleccionar(indice: number) {
    if (!quantidade) return;
    setSlideAtual((indice + quantidade) % quantidade);
    setPausado(true);
  }

  if (!quantidade) return null;

  return (
    <section className={s.hero} aria-label="Destaques de Nhamatanda" aria-roledescription="carrossel" onMouseEnter={() => setInteragindo(true)} onMouseLeave={() => setInteragindo(false)} onFocusCapture={() => setFocado(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocado(false); }}>
      <div className={s.heroImages} aria-hidden="true">
        {slides.map((slide, index) => (
          <Image key={`${slide.imagem}-${index}`} src={slide.imagem} alt="" fill sizes="100vw" priority={index === 0} className={`${s.heroImage} ${index === atual ? s.imageActive : ""}`} />
        ))}
      </div>

      <div className={s.heroVeil} aria-hidden="true" />

      <div className={`${s.container} ${s.heroInner}`}>
        <div className={s.slides}>
          {slides.map((slide, index) => (
            <div key={`${slide.titulo}-${index}`} className={`${s.slide} ${index === atual ? s.slideActive : ""}`} aria-hidden={index !== atual} inert={index !== atual} role="group" aria-roledescription="slide" aria-label={`${index + 1} de ${quantidade}`}>
              {slide.eyebrow && <p className={s.eyebrow}>{slide.eyebrow}</p>}
              <h1 className={s.title}>{slide.titulo}</h1>
              {slide.subtitulo && <p className={s.intro}>{slide.subtitulo}</p>}
              {slide.subtitulo2 && <p className={s.context}>{slide.subtitulo2}</p>}
              <div className={s.actions}>
                <Link className={s.primary} href={slide.botao.href}>{slide.botao.texto}<IconArrowRight size={18} /></Link>
              </div>
            </div>
          ))}
        </div>

        {quantidade > 1 && (
          <div className={s.controls}>
            <button type="button" className={s.arrowButton} onClick={() => seleccionar(atual - 1)} aria-label="Slide anterior"><IconChevronLeft size={18} /></button>
            <div className={s.dots}>
              {slides.map((slide, index) => (
                <button key={index} type="button" className={s.dotButton} onClick={() => seleccionar(index)} aria-label={`Mostrar destaque ${index + 1}: ${slide.titulo}`} aria-current={index === atual ? "true" : undefined}><span /></button>
              ))}
            </div>
            <button type="button" className={s.arrowButton} onClick={() => seleccionar(atual + 1)} aria-label="Slide seguinte"><IconChevronRight size={18} /></button>
            {!movimentoReduzido && <button type="button" className={s.pauseButton} onClick={() => setPausado(valor => !valor)} aria-pressed={pausado}>{pausado ? "Retomar" : "Pausar"}</button>}
          </div>
        )}
      </div>
    </section>
  );
}