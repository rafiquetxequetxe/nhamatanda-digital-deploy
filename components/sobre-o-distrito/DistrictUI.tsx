import type { ReactNode } from 'react';
import s from './district.module.css';
export function Heading({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return <div className={s.heading}><p className={s.eyebrow}>{eyebrow}</p><h2>{title}</h2>{children && <p className={s.intro}>{children}</p>}</div>;
}
export function Arrow() { return <span aria-hidden="true">↗</span>; }
export function Symbol({ kind = 'location' }: { kind?: 'location' | 'people' | 'leaf' | 'road' }) {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {kind === 'location' && <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>}
    {kind === 'people' && <><circle cx="9" cy="7" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6m2 4a5 5 0 0 1 3 5v2"/></>}
    {kind === 'leaf' && <><path d="M20 3C9 2 3 7 5 14c2 7 15 5 15-11ZM3 22 15 10"/></>}
    {kind === 'road' && <><path d="m7 2-4 20M17 2l4 20M12 3v3m0 4v4m0 4v3"/></>}
  </svg>;
}
