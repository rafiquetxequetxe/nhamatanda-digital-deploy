"use client";

import Image from "next/image";
import { useState } from "react";
import { Icon } from "./Icon";
import s from "@/app/governacao/[slug]/missao.module.css";

export function Photo({
  src,
  alt,
  priority = false,
  sizes = "(max-width: 760px) 100vw, 60vw",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
}) {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <div className={s.photoFallback}>
      <Icon name="leaf" size={46} />
      <span>Imagem em preparação</span>
    </div>
  ) : (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={s.photo}
      onError={() => setFailed(true)}
    />
  );
}