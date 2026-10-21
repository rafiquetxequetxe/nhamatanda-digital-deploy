import { copyFileSync, mkdirSync, readdirSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
const require = createRequire(import.meta.url);
const dist = path.join(
  path.dirname(require.resolve("maplibre-gl/package.json")),
  "dist",
);
const files = readdirSync(dist).filter((file) => file.endsWith(".mjs"));
if (!files.includes("maplibre-gl-worker.mjs"))
  throw new Error(
    "Este componente requer MapLibre GL JS 6.x, com maplibre-gl-worker.mjs.",
  );
const destination = path.join(process.cwd(), "public", "maplibre");
mkdirSync(destination, { recursive: true });
for (const file of files)
  copyFileSync(path.join(dist, file), path.join(destination, file));
console.log(`MapLibre: ${files.length} módulos copiados para public/maplibre.`);
