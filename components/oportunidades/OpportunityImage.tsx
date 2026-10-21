"use client";
import Image from "next/image";
import { useState } from "react";

export default function OpportunityImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", background: "#e7eee9", color: "#526b5c", fontSize: 13 }}>Imagem em preparação</div>;
  return <Image src={src} alt={alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{ objectFit: "cover" }} onError={() => setFailed(true)} />;
}