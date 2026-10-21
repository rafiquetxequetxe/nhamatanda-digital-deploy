"use client";

import dynamic from "next/dynamic";

const NhamatandaMap = dynamic(
  () => import("@/components/mapas/NhamatandaMap"),
  {
    ssr: false,
    loading: () => (
      <div
        role="status"
        aria-live="polite"
        className="flex w-full items-center justify-center rounded-2xl bg-[#e8eee9] text-sm text-slate-600"
        style={{ height: "clamp(480px, 72vh, 760px)" }}
      >
        A carregar mapa…
      </div>
    ),
  },
);

export default NhamatandaMap;