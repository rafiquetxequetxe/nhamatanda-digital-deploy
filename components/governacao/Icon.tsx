import type { ReactNode } from "react";
import type { IconName } from "@/lib/missoes";

const PATHS: Record<IconName, ReactNode> = {
  arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
  target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><path d="M12 12 20 4M16 4h4v4" /></>,
  gear: <><path d="m9 3 1-2h4l1 2 3 2 3 1v4l-2 2 2 2v4l-3 1-3 2-1 2h-4l-1-2-3-2-3-1v-4l2-2-2-2V6l3-1Z" /><circle cx="12" cy="12" r="4" /></>,
  handshake: <><path d="m8 12 3 3a2 2 0 0 0 3 0l5-5" /><path d="m2 8 5-4 4 2 2-1 4 2 5 5-5 6-3-2" /><path d="m2 8 4 5 2-1" /></>,
  chart: <path d="M2 21h20M4 21V12h4v9m2 0V7h4v14m2 0V3h4v18" />,
  leaf: <><path d="M12 22V11M12 16C4 17 2 11 3 5c7 0 10 4 9 11ZM12 12C12 5 17 2 22 3c0 6-3 10-10 9Z" /><path d="M6 9l6 7m5-10-5 6" /></>,
  drop: <path d="M12 2S5 10 5 15a7 7 0 0 0 14 0c0-5-7-13-7-13Z" />,
  education: <><path d="m3 9 9-5 9 5-9 5-9-5Z" /><path d="M6 11v5c0 2 2.7 4 6 4s6-2 6-4v-5M21 9v6" /></>,
  road: <><path d="M8 22 10 2h4l2 20" /><path d="M12 5v3m0 4v3m0 4v2M4 22h16" /></>,
  shield: <><path d="M12 2 20 5v6c0 5-3 9-8 11-5-2-8-6-8-11V5l8-3Z" /><path d="m8.5 12 2.3 2.3 4.7-5" /></>,
  building: <><path d="M4 22V7l8-5 8 5v15M8 22v-4h8v4M8 9h2m4 0h2m-8 4h2m4 0h2" /></>,
  map: <><path d="M12 22s7-6 7-13a7 7 0 1 0-14 0c0 7 7 13 7 13Z" /><circle cx="12" cy="9" r="2.5" /></>,
  people: <><circle cx="12" cy="7" r="3" /><path d="M6 22v-5a6 6 0 0 1 12 0v5" /><path d="M5 8a2.5 2.5 0 0 0 0 5m14-5a2.5 2.5 0 0 1 0 5" /></>,
  check: <path d="m5 13 4 4L19 7" />,
  image: <><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="8.5" cy="9.5" r="1.5" /><path d="m21 15-5-5L5 21" /></>,
};

export function Icon({ name, size = 28 }: { name: IconName; size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {PATHS[name]}
    </svg>
  );
}