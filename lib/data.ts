import type {
  Feature,
  FeatureCollection,
  Polygon,
  MultiPolygon,
} from "geojson";
import { bbox, booleanIntersects } from "@turf/turf";
import osmtogeojson from "osmtogeojson";
import { THEMES, type ThemeKey, type ThemeSpec } from "./catalog";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const ROOT = "https://www.mozgis.gov.mz/server/rest/services/Data/";
const TTL = 6 * 60 * 60 * 1000;
export type LayerPayload = {
  data: FeatureCollection;
  meta: {
    source: string;
    note: string;
    retrievedAt: string;
    count: number;
    warnings: string[];
    urls: string[];
  };
};
const cache = new Map<string, { expires: number; value: LayerPayload }>();
const pending = new Map<string, Promise<LayerPayload>>();
let active = 0;
const queue: (() => void)[] = [];
async function limited<T>(fn: () => Promise<T>): Promise<T> {
  if (active >= 4) await new Promise<void>((resolve) => queue.push(resolve));
  else active++;
  try {
    return await fn();
  } finally {
    const next = queue.shift();
    if (next) next();
    else active--;
  }
}
async function json(url: string, init?: RequestInit): Promise<any> {
  return limited(async () => {
    const response = await fetch(url, {
      ...init,
      signal: AbortSignal.timeout(35000),
    });
    if (!response.ok)
      throw new Error(`Fonte respondeu HTTP ${response.status}`);
    const value = await response.json();
    if (value.error)
      throw new Error(String(value.error.message || "Erro no serviço"));
    return value;
  });
}
function serviceUrl(name: string, id: number) {
  return `${ROOT}${encodeURIComponent(name)}/MapServer/${id}`;
}
async function cached(key: string, fn: () => Promise<LayerPayload>) {
  const hit = cache.get(key);
  if (hit && hit.expires > Date.now()) return hit.value;
  const running = pending.get(key);
  if (running) return running;
  const task = fn()
    .then((value) => {
      // Resultados parciais expiram cedo para permitir nova tentativa.
      cache.set(key, {
        expires: Date.now() + (value.meta.warnings.length ? 60000 : TTL),
        value,
      });
      return value;
    })
    .finally(() => pending.delete(key));
  pending.set(key, task);
  return task;
}
function collection(value: any): FeatureCollection {
  if (value?.type !== "FeatureCollection" || !Array.isArray(value.features))
    throw new Error("GeoJSON inválido na fonte");
  return value;
}
async function queryAll(
  url: string,
  params: URLSearchParams,
): Promise<FeatureCollection> {
  // Object IDs primeiro: evita omissões silenciosas pelo limite de 1000 registos.
  const idParams = new URLSearchParams(params);
  idParams.set("returnIdsOnly", "true");
  idParams.set("f", "json");

  const idData = await json(`${url}/query?${idParams}`);

if (!Array.isArray(idData.objectIds)) {
  // Confirma se a ausência de identificadores significa
  // que não existem elementos para este filtro.
  const countParams = new URLSearchParams(params);

  countParams.delete("returnIdsOnly");
  countParams.set("returnCountOnly", "true");
  countParams.set("returnGeometry", "false");
  countParams.set("f", "json");

  const countData = await json(
    `${url}/query?${countParams}`
  );

  if (countData.count === 0) {
    return {
      type: "FeatureCollection",
      features: [],
    };
  }

  throw new Error(
    "A fonte não devolveu os identificadores. " +
      `Contagem devolvida: ${String(countData.count ?? "indisponível")}.`
  );
}

  const ids: number[] = idData.objectIds;
  if (ids.length > 20000)
    throw new Error(
      "Mais de 20.000 elementos: prepare uma camada estática optimizada",
    );
  const features: Feature[] = [];
  for (let start = 0; start < ids.length; start += 300) {
    const p = new URLSearchParams({
      objectIds: ids.slice(start, start + 300).join(","),
      outFields: "*",
      returnGeometry: "true",
      outSR: "4326",
      f: "geojson",
    });
    const raw = await json(`${url}/query`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: p,
    });
    if (raw.exceededTransferLimit)
      throw new Error("Resposta truncada pelo serviço");
    features.push(...collection(raw).features);
  }
  return { type: "FeatureCollection", features };
}
export async function admin(
  key: "district" | "posts"
): Promise<LayerPayload> {
  const filename =
    key === "district" ? "distrito.geojson" : "postos.geojson";

  const filepath = join(
  process.cwd(),
  "public",
  filename
  );

  let text: string;

  try {
    text = await readFile(filepath, "utf8");
  } catch {
    throw new Error(
      `Não foi possível ler /${filename}.`
    );
  }

  let parsed: unknown;

  try {
    // Remove BOM, caso tenha sido acrescentado ao guardar o ficheiro.
    parsed = JSON.parse(text.replace(/^\uFEFF/, ""));
  } catch {
    throw new Error(`${filename} não contém JSON válido.`);
  }

  const data = collection(parsed);

  if (data.features.length === 0) {
    throw new Error(`${filename} não contém elementos geográficos.`);
  }

  const invalidGeometry = data.features.some(
    (feature) =>
      !feature.geometry ||
      !["Polygon", "MultiPolygon"].includes(feature.geometry.type)
  );

  if (invalidGeometry) {
    throw new Error(
      `${filename} deve conter limites em Polygon ou MultiPolygon.`
    );
  }

  return {
    data,
    meta: {
      source: "Ficheiro local de limites administrativos",
      note:
        "Limites fornecidos para o portal. Data de actualização não indicada.",
      count: data.features.length,
      retrievedAt: new Date().toISOString(),
      warnings: [],
      urls: [`/${filename}`]
    },
  };
}
function keepIntersecting(
  data: FeatureCollection,
  district: FeatureCollection,
): FeatureCollection {
  const polygons = district.features.filter(
    (f) =>
      f.geometry?.type === "Polygon" || f.geometry?.type === "MultiPolygon",
  ) as Feature<Polygon | MultiPolygon>[];
  if (!polygons.length)
    throw new Error("O limite do distrito não contém polígonos");
  return {
    type: "FeatureCollection",
    features: data.features.filter((feature) => {
      if (!feature.geometry) return false;
      // Falhas de geometria são reportadas; não se omitem elementos silenciosamente.
      return polygons.some((p) => booleanIntersects(feature, p));
    }),
  };
}
function nameOf(p: Record<string, any>, fallback: string) {
  for (const key of [
    "name:pt",
    "name",
    "Nome",
    "Cidade",
    "Escola",
    "Unidade",
    "Rio",
    "Posto",
    "Estrada",
    "Designacao",
    "DESIGNACAO",
  ]) {
    if (typeof p[key] === "string" && p[key].trim()) return p[key];
  }
  const entry = Object.entries(p).find(
    ([k, v]) =>
      /nome|name|designa/i.test(k) && typeof v === "string" && v.trim(),
  );
  return entry?.[1] || fallback;
}
function decorate(
  data: FeatureCollection,
  metadata: any,
  spec: ThemeSpec,
  url: string,
  sublayer: string,
): FeatureCollection {
  const fields: any[] = metadata.fields ?? [];
  return {
    type: "FeatureCollection",
    features: data.features.map((feature) => {
      const p = { ...feature.properties };
      const details: Record<string, unknown> = {};
      for (const field of fields) {
        if (/geometry|oid/i.test(field.type) || /^Shape/i.test(field.name))
          continue;
        let value = p[field.name];
        const coded = field.domain?.codedValues?.find(
          (v: any) => v.code === value,
        );
        if (coded) value = coded.name;
        if (value !== null && value !== undefined && value !== "")
          details[field.alias || field.name] = value;
      }
      return {
        ...feature,
        properties: {
          ...p,
          _title: nameOf(p, sublayer),
          _category: sublayer,
          _source: spec.source,
          _sourceUrl: url,
          _details: JSON.stringify(details),
        },
      };
    }),
  };
}
async function arcgis(
  key: ThemeKey,
  spec: ThemeSpec,
  district: FeatureCollection,
): Promise<LayerPayload> {
  const bounds = bbox(district);
  const envelope = JSON.stringify({
    xmin: bounds[0],
    ymin: bounds[1],
    xmax: bounds[2],
    ymax: bounds[3],
    spatialReference: { wkid: 4326 },
  });
  const urls = (spec.ids ?? []).map((id) => serviceUrl(spec.service!, id));
  const results = await Promise.allSettled(
    urls.map(async (url) => {
      const metadata = await json(`${url}?f=json`);
      const parameters = new URLSearchParams({
        where: key === "demografia" ? "Distrito='Nhamatanda'" : "1=1",
        geometry: envelope,
        geometryType: "esriGeometryEnvelope",
        inSR: "4326",
        spatialRel: "esriSpatialRelIntersects",
      });
      const data = await queryAll(url, parameters);
      return decorate(
        keepIntersecting(data, district),
        metadata,
        spec,
        url,
        metadata.name || spec.title,
      );
    }),
  );
  const warnings: string[] = [];
  const features: Feature[] = [];
  results.forEach((result, i) => {
    if (result.status === "fulfilled") features.push(...result.value.features);
    else warnings.push(`Subcamada ${spec.ids?.[i]}: ${String(result.reason)}`);
  });
  if (results.every((r) => r.status === "rejected"))
    throw new Error(warnings.join("; "));
  return {
    data: { type: "FeatureCollection", features },
    meta: {
      source: spec.source,
      note:
        spec.note +
        " Elementos que intersectam o distrito; geometrias não recortadas.",
      count: features.length,
      retrievedAt: new Date().toISOString(),
      warnings,
      urls,
    },
  };
}
async function osm(
  spec: ThemeSpec,
  district: FeatureCollection,
): Promise<LayerPayload> {
  const b = bbox(district);
  const bounds = `${b[1]},${b[0]},${b[3]},${b[2]}`;
  const query = `[out:json][timeout:25];(${spec.selectors!.map((s) => `nwr${s}(${bounds});`).join("")});out body geom;`;
  const endpoints = [
    "https://overpass-api.de/api/interpreter",
    "https://overpass.kumi.systems/api/interpreter",
  ];
  let url = endpoints[0];
  let raw: Record<string, unknown> | undefined;
  const failures: string[] = [];
  for (const endpoint of endpoints) {
    try {
      const candidate = await json(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
          "User-Agent": "NhamatandaPortal/1.0 (district GIS map)",
        },
        body: new URLSearchParams({ data: query }),
      });
      if (candidate.remark) throw new Error(`Overpass: ${candidate.remark}`);
      if (!Array.isArray(candidate.elements))
        throw new Error("Resposta Overpass sem elementos");
      raw = candidate;
      url = endpoint;
      break;
    } catch (error) {
      failures.push(String(error));
    }
  }
  if (!raw)
    throw new Error(
      "Serviços OpenStreetMap indisponíveis: " + failures.join("; "),
    );
  const converted = keepIntersecting(
    osmtogeojson(raw as unknown as Parameters<typeof osmtogeojson>[0], {
      flatProperties: true,
    }) as FeatureCollection,
    district,
  );
  converted.features = converted.features.map((f) => {
    const p = f.properties ?? {};
    const id = String(f.id ?? p.id ?? "");
    const sourceUrl = /^(node|way|relation)\/\d+$/.test(id)
      ? `https://www.openstreetmap.org/${id}`
      : "https://www.openstreetmap.org/copyright";
    return {
      ...f,
      properties: {
        ...p,
        _title: nameOf(p, spec.title),
        _source: spec.source,
        _sourceUrl: sourceUrl,
        _category:
          p.amenity ||
          p.landuse ||
          p.man_made ||
          p.natural ||
          p.shop ||
          spec.title,
        _details: JSON.stringify(p),
      },
    };
  });
  return {
    data: converted,
    meta: {
      source: spec.source,
      note:
        spec.note +
        " Cobertura colaborativa, potencialmente incompleta. Geometrias que intersectam o distrito, sem recorte.",
      count: converted.features.length,
      retrievedAt: new Date().toISOString(),
      warnings: [],
      urls: [url],
    },
  };
}
export async function thematic(key: ThemeKey): Promise<LayerPayload> {
  return cached(key, async () => {
    const spec: ThemeSpec = THEMES[key];
    if (spec.kind === "dem") throw new Error("Camada calculada no navegador");
    const district = (await admin("district")).data;
    return spec.kind === "osm"
      ? osm(spec, district)
      : arcgis(key, spec, district);
  });
}
