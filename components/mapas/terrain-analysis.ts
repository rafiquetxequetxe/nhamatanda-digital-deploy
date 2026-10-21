import * as maplibregl from "maplibre-gl";
const MAX_Z = 12;
let serial = 0;
export const ALTITUDE_LEGEND = [
  ["< 50 m", "#387b88"],
  ["50–100 m", "#74a96c"],
  ["100–250 m", "#c4c77b"],
  ["250–500 m", "#d7ae72"],
  ["500–1.000 m", "#a77656"],
  ["≥ 1.000 m", "#eee8dc"],
];
export const SLOPE_LEGEND = [
  ["< 2°", "#5aaf7b"],
  ["2–5°", "#b9cf72"],
  ["5–15°", "#eed078"],
  ["15–30°", "#e79856"],
  ["30–45°", "#cf5d50"],
  ["≥ 45°", "#8a405b"],
];
export function slopeDegrees(
  left: number,
  right: number,
  up: number,
  down: number,
  metres: number,
) {
  return (
    (Math.atan(
      Math.hypot((right - left) / (2 * metres), (down - up) / (2 * metres)),
    ) *
      180) /
    Math.PI
  );
}
export function decodeTerrarium(r: number, g: number, b: number) {
  return r * 256 + g + b / 256 - 32768;
}
function color(value: number, slope: boolean): [number, number, number] {
  const stops = slope ? [2, 5, 15, 30, 45] : [50, 100, 250, 500, 1000];
  const legend = slope ? SLOPE_LEGEND : ALTITUDE_LEGEND;
  const index = stops.findIndex((stop) => value < stop);
  const hex = legend[index < 0 ? 5 : index][1];
  return [1, 3, 5].map((start) =>
    parseInt(hex.slice(start, start + 2), 16),
  ) as [number, number, number];
}
export function createTerrainAnalysis(map: maplibregl.Map) {
  const protocol = `nhamdem${++serial}`;
  const lifetime = new AbortController();
  const tiles = new Map<string, Promise<Float32Array>>();
  const rendered = new Map<string, ArrayBuffer>();
  async function tile(z: number, x: number, y: number): Promise<Float32Array> {
    const n = 2 ** z;
    x = ((x % n) + n) % n;
    y = Math.max(0, Math.min(n - 1, y));
    const key = `${z}/${x}/${y}`;
    const hit = tiles.get(key);
    if (hit) return hit;
    const promise = (async () => {
      const response = await fetch(
        `https://s3.amazonaws.com/elevation-tiles-prod/terrarium/${key}.png`,
        { signal: lifetime.signal },
      );
      if (!response.ok) throw new Error(`DEM HTTP ${response.status}`);
      const image = await createImageBitmap(await response.blob());
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 256;
      const context = canvas.getContext("2d", { willReadFrequently: true });
      if (!context) {
        image.close();
        throw new Error("Canvas 2D indisponível");
      }
      context.drawImage(image, 0, 0);
      image.close();
      const bytes = context.getImageData(0, 0, 256, 256).data;
      const result = new Float32Array(256 * 256);
      for (let i = 0; i < result.length; i++)
        result[i] = bytes[i * 4 + 3]
          ? decodeTerrarium(bytes[i * 4], bytes[i * 4 + 1], bytes[i * 4 + 2])
          : NaN;
      return result;
    })().catch((error) => {
      tiles.delete(key);
      throw error;
    });
    tiles.set(key, promise);
    if (tiles.size > 192) tiles.delete(tiles.keys().next().value!);
    return promise;
  }
  async function values(z: number, x: number, y: number, slope: boolean) {
    const center = await tile(z, x, y);
    if (!slope)
      return { center, left: center, right: center, up: center, down: center };
    const [left, right, up, down] = await Promise.all([
      tile(z, x - 1, y),
      tile(z, x + 1, y),
      tile(z, x, y - 1),
      tile(z, x, y + 1),
    ]);
    return { center, left, right, up, down };
  }
  type Samples = Awaited<ReturnType<typeof values>>;
  function sample(v: Samples, z: number, y: number, px: number, py: number) {
    const left = px > 0 ? v.center[py * 256 + px - 1] : v.left[py * 256 + 255];
    const right = px < 255 ? v.center[py * 256 + px + 1] : v.right[py * 256];
    const up = py > 0 ? v.center[(py - 1) * 256 + px] : v.up[255 * 256 + px];
    const down = py < 255 ? v.center[(py + 1) * 256 + px] : v.down[px];
    const lat = Math.atan(
      Math.sinh(Math.PI * (1 - (2 * (y + (py + 0.5) / 256)) / 2 ** z)),
    );
    return slopeDegrees(
      left,
      right,
      up,
      down,
      (40075016.686 * Math.cos(lat)) / (256 * 2 ** z),
    );
  }
  maplibregl.addProtocol(protocol, async (request, controller) => {
    const url = new URL(request.url);
    const slope = url.hostname === "declividade";
    const [z, x, y] = url.pathname
      .replace(/\.png$/, "")
      .split("/")
      .filter(Boolean)
      .map(Number);
    const cached = rendered.get(request.url);
    if (cached) return { data: cached.slice(0) };
    const v = await values(z, x, y, slope);
    controller.signal.throwIfAborted();
    lifetime.signal.throwIfAborted();
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Canvas indisponível");
    const image = context.createImageData(256, 256);
    for (let py = 0; py < 256; py++)
      for (let px = 0; px < 256; px++) {
        const index = py * 256 + px;
        const value = slope ? sample(v, z, y, px, py) : v.center[index];
        if (!Number.isFinite(value)) continue;
        image.data.set([...color(value, slope), 255], index * 4);
      }
    context.putImageData(image, 0, 0);
    const blob = await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("Falha ao gerar relevo"))),
        "image/png",
      ),
    );
    const data = await blob.arrayBuffer();
    controller.signal.throwIfAborted();
    lifetime.signal.throwIfAborted();
    rendered.set(request.url, data);
    if (rendered.size > 128) rendered.delete(rendered.keys().next().value!);
    return { data: data.slice(0) };
  });
  return {
    add(key: "altitude" | "declividade") {
      const id = `theme-${key}`;
      if (map.getSource(id)) return;
      // Limita a resolução máxima para controlar o custo no navegador.
      map.addSource(id, {
        type: "raster",
        tiles: [`${protocol}://${key}/{z}/{x}/{y}.png`],
        tileSize: 256,
        minzoom: 0,
        maxzoom: MAX_Z,
        bounds: [33.5, -20, 35.3, -18.3],
        attribution: "Elevação: Terrain Tiles / Terrarium",
      });
      const before = map
        .getStyle()
        .layers?.find(
          (l) => l.id === "district-fill" || l.type === "symbol",
        )?.id;
      map.addLayer(
        {
          id,
          type: "raster",
          source: id,
          minzoom: 8,
          layout: { visibility: "none" },
          paint: { "raster-opacity": 0.7, "raster-resampling": "nearest" },
        },
        before,
      );
    },
    async inspect(lng: number, lat: number) {
      const Z = Math.max(0, Math.min(MAX_Z, Math.floor(map.getZoom())));
      const scale = 2 ** Z;
      const xx = ((lng + 180) / 360) * scale;
      const radians = (lat * Math.PI) / 180;
      const yy =
        ((1 - Math.log(Math.tan(radians) + 1 / Math.cos(radians)) / Math.PI) /
          2) *
        scale;
      const x = Math.floor(xx),
        y = Math.floor(yy);
      const px = Math.min(255, Math.floor((xx - x) * 256)),
        py = Math.min(255, Math.floor((yy - y) * 256));
      const v = await values(Z, x, y, true);
      return {
        altitude: v.center[py * 256 + px],
        slope: sample(v, Z, y, px, py),
      };
    },
    dispose() {
      lifetime.abort();
      tiles.clear();
      rendered.clear();
      maplibregl.removeProtocol(protocol);
    },
  };
}
