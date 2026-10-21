"use client";
import Image from 'next/image';
import { useState } from 'react';
import s from './district.module.css';

type Props = { src: string; alt: string; priority?: boolean; sizes?: string };
export default function DistrictPhoto({ src, alt, priority = false, sizes = '(max-width: 760px) 100vw, 50vw' }: Props) {
  const [failed, setFailed] = useState(false);
  return <div className={s.photo}>
    {failed ? <div className={s.photoFallback} role="img" aria-label={alt + ' — fotografia por disponibilizar'}><span>NHAMATANDA</span><span>Território · Pessoas · Possibilidades</span></div>
      : <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={s.image} onError={() => setFailed(true)} />}
  </div>;
}
