import * as maplibregl from "maplibre-gl";
import type { FeatureCollection } from "geojson";
import {
  THEMES,
  THEME_KEYS,
  type ThemeKey,
} from "../../lib/catalog";
import { createTerrainAnalysis } from "./terrain-analysis";
export type LayerState = {
  state: "idle" | "loading" | "ready" | "empty" | "error" | "partial";
  count?: number;
  message?: string;
  source?: string;
  retrievedAt?: string;
};
export function createThemeController(
  map: maplibregl.Map,
  update: (key: ThemeKey, state: LayerState) => void,
) {
  let disposed = false;

  const desired = new Map<ThemeKey, boolean>();
  const loaded = new Set<ThemeKey>();
  const running = new Set<ThemeKey>();
  const controllers = new Set<AbortController>();
  const ids = new Map<ThemeKey, string[]>();
  const terrain = createTerrainAnalysis(map);
  let popup: maplibregl.Popup | undefined;
  let clickSerial = 0;
  const keyBySource = new Map<string, ThemeKey>();
  const show = (key: ThemeKey) => {
    for (const id of ids.get(key) ?? [])
      if (map.getLayer(id))
        map.setLayoutProperty(
          id,
          "visibility",
          desired.get(key) ? "visible" : "none",
        );
  };
  const localFiles: Record<string, string> = {
  rios: "/rios.json",
  bacias: "/bacias.json",
  nascentes: "/nascentes.json",
  estradas: "/estradas.json",
  agua: "/agua.json",
  educacao: "/educacao.json",
  saude: "/saude.json",
  energia: "/energia.json",
  telecom: "/telecom.json",
  usoSolo: "/usoSolo.json",
  vegetacao: "/vegetacao.json",
  demografia: "/demografia.json",
  agricultura: "/agricultura.json",
  areasUrbanas: "/areasUrbanas.json",
  economia: "/economia.json",
  
  };
  const removeLayers = (key: ThemeKey) => {
    for (const id of ids.get(key) ?? [])
      if (map.getLayer(id)) map.removeLayer(id);
    if (map.getSource(`theme-${key}`)) map.removeSource(`theme-${key}`);
    ids.delete(key);
    loaded.delete(key);
  };
  async function load(key: ThemeKey) {
    if (running.has(key) || disposed) return;
    running.add(key);
    update(key, { state: "loading" });
    const controller = new AbortController();
    controllers.add(controller);
    const timeout = setTimeout(() => controller.abort(), 180000);
    try {
      const spec = THEMES[key];
      if (spec.kind === "dem") {
        terrain.add(key as "altitude" | "declividade");
        ids.set(key, [`theme-${key}`]);
        keyBySource.set(`theme-${key}`, key);
        loaded.add(key);
        show(key);
        // "ready" significa camada preparada; eventuais falhas de mosaicos são reportadas abaixo.
        update(key, {
          state: "ready",
          source: spec.source,
          message: spec.note,
        });
        return;
      }
      
      const url = localFiles[key] ?? `/api/nhamatanda/${key}`;

const response = await fetch(url, {
  signal: controller.signal,
  cache: "no-store",
});

const text = await response.text();
const content = text.replace(/^\uFEFF/, "").trimStart();

if (content.startsWith("<")) {
  throw new Error(
    `O pedido ${url} devolveu HTML em vez de JSON. ` +
      `HTTP ${response.status}. ` +
      `Endereço final: ${response.url}`
  );
}

if (!response.ok) {
  throw new Error(
    `Falha ao carregar ${url}: HTTP ${response.status}. ` +
      content.slice(0, 180)
  );
}

let payload;

try {
  payload = JSON.parse(content);
} catch {
  throw new Error(
    `O conteúdo de ${url} não é JSON válido. ` +
      `Início da resposta: ${content.slice(0, 100)}`
  );
}

if (payload.error) {
  throw new Error(
    `${url}: ${
      typeof payload.error === "string"
        ? payload.error
        : payload.error.message || "Erro na fonte"
    }`
  );
}


      
      const data: FeatureCollection = payload.data;
      if (data?.type !== "FeatureCollection" || !Array.isArray(data.features))
        throw new Error("Resposta geográfica inválida");
      if (!data.features.length) {
        update(key, {
          state: payload.meta.warnings.length ? "partial" : "empty",
          count: 0,
          source: payload.meta.source,
          message: payload.meta.note + " " + payload.meta.warnings.join("; "),
          retrievedAt: payload.meta.retrievedAt,
        });
        loaded.add(key);
        return;
      }
      const source = `theme-${key}`;
      map.addSource(source, {
        type: "geojson",
        data,
        attribution:
          spec.kind === "osm"
            ? '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
            : 'Dados: <a href="https://www.mozgis.gov.mz/">MozGIS</a>',
      });
      keyBySource.set(source, key);
      const fill = `${source}-fill`,
        line = `${source}-line`,
        point = `${source}-point`,
        label = `${source}-label`;
      ids.set(key, [fill, line, point, label]);
      const before = map
        .getStyle()
        .layers?.find((l) => l.type === "symbol")?.id;
      let color: maplibregl.ExpressionSpecification | string = spec.color;
      if (key === "estradas") {
        color = [
        "match",
        ["get", "_category"],
        "Primárias", "#FFAA38",
        "Secundárias", "#F4DE76",
        "Vicinal", "#D9B995",
        "Outras Estradas", "#D1D5DB",
        "Rede ferroviária", "#BA91F2",
        "#D1D5DB",
       ];
      }
      if (key === "demografia")
        color = [
          "case",
          ["==", ["get", "Pop2007"], null],
          "#9ca3af",
          [
            "step",
            ["to-number", ["get", "Pop2007"], 0],
            "#fee8c8",
            10000,
            "#fdbb84",
            25000,
            "#fc8d59",
            50000,
            "#e34a33",
            100000,
            "#b30000",
          ],
        ];
      if (key === "usoSolo")
        color = [
          "match",
          ["get", "EstadoCoberturaTerraOcup1"],
          "N",
          "#72a678",
          "A",
          "#d8c27a",
          "AI",
          "#92c5bc",
          "S",
          "#cb8d90",
          "#9ca3af",
        ];
      map.addLayer(
        {
          id: fill,
          type: "fill",
          source,
          filter: ["==", ["geometry-type"], "Polygon"],
          layout: { visibility: "none" },
          paint: {
            "fill-color": color,
            "fill-opacity": key === "demografia" ? 0.65 : 0.35,
          },
        },
        before,
      );
      map.addLayer(
        {
          id: line,
          type: "line",
          source,
          filter: ["!=", ["geometry-type"], "Point"],
          layout: { visibility: "none" },
          paint: {
            "line-color": color,
            
            "line-width":
  key === "estradas"
    ? [
        "interpolate",
        ["linear"],
        ["zoom"],
        7,
        [
          "match",
          ["get", "_category"],
          "Primárias", 2.8,
          "Rede ferroviária", 3,
          1.5,
        ],
        13,
        [
          "match",
          ["get", "_category"],
          "Primárias", 6,
          "Rede ferroviária", 6,
          "Secundárias", 4.5,
          3,
        ],
      ]
    : [
        "case",
        ["==", ["geometry-type"], "Polygon"],
        1.2,
        2.5,
      ],


            "line-opacity": 0.9,
          },
        },
        before,
      );
      map.addLayer({
        id: point,
        type: "circle",
        source,
        filter: ["==", ["geometry-type"], "Point"],
        layout: { visibility: "none" },
        paint: {
          "circle-color": spec.color,
          "circle-radius": ["interpolate", ["linear"], ["zoom"], 7, 3, 13, 7],
          "circle-stroke-color": "#ffffff",
          "circle-stroke-width": 1.5,
        },
      });
      map.addLayer({
        id: label,
        type: "symbol",
        source,
        minzoom: key === "localidades" ? 8 : 11,
        filter: ["==", ["geometry-type"], "Point"],
        layout: {
          visibility: "none",
          "text-field": ["get", "_title"],
          "text-font": ["Noto Sans Regular"],
          "text-size": 11,
          "text-offset": [0, 1.1],
          "text-anchor": "top",
          "text-max-width": 12,
        },
        paint: {
          "text-color": "#ffffff",
          "text-halo-color": "#16332a",
          "text-halo-width": 1.5,
        },
      });
      if (key === "estradas") {
  const railwayMarks = `${source}-railway-marks`;
  const routeLabels = `${source}-route-label`;

  // Regista as novas camadas para activar, desactivar e limpar
  // juntamente com a camada de transportes.
  ids.set(key, [
    ...(ids.get(key) ?? []),
    railwayMarks,
    routeLabels,
  ]);

  // Traços claros sobre a linha violeta distinguem a ferrovia.
  map.addLayer(
    {
      id: railwayMarks,
      type: "line",
      source,
      filter: [
        "==",
        ["get", "_category"],
        "Rede ferroviária",
      ],
      layout: {
        visibility: "none",
      },
      paint: {
        "line-color": "#FFFFFF",
        "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          7, 1.2,
          13, 2.5,
        ],
        "line-dasharray": [2, 3],
        "line-opacity": 0.95,
      },
    },
    before,
  );

  map.addLayer({
    id: routeLabels,
    type: "symbol",
    source,
    minzoom: 8,
    filter: ["==", ["geometry-type"], "LineString"],
    layout: {
      visibility: "none",
      "symbol-placement": "line",
      "symbol-spacing": 550,
      "text-field": [
        "case",
        ["==", ["get", "_category"], "Rede ferroviária"],
        "Ferrovia · Beira/Moatize",
        ["==", ["get", "No"], "N6"],
        "N6 · Corredor da Beira",
        ["==", ["get", "No"], "N1"],
        "N1",
        ["==", ["get", "No"], "N280"],
        "N280 · Tica–Nova Sofala",
        ["==", ["get", "No"], "R1000"],
        "R1000",
        "",
      ],
      "text-font": ["Noto Sans Regular"],
      "text-size": [
        "interpolate",
        ["linear"],
        ["zoom"],
        8, 11,
        13, 14,
      ],
      "text-allow-overlap": false,
      "text-ignore-placement": false,
      "text-padding": 12,
      "text-keep-upright": true,
    },
    paint: {
      "text-color": "#FFFFFF",
      "text-halo-color": "#182B25",
      "text-halo-width": 2,
    },
  });
}
      if (map.getLayer("district-outline"))
        map.moveLayer("district-outline", before);
      loaded.add(key);
      show(key);
      update(key, {
        state: payload.meta.warnings.length ? "partial" : "ready",
        count: data.features.length,
        source: payload.meta.source,
        message: payload.meta.note + " " + payload.meta.warnings.join("; "),
        retrievedAt: payload.meta.retrievedAt,
      });
    } catch (error) {
      if (disposed) return;
      removeLayers(key);
      update(key, {
        state: "error",
        message: error instanceof Error ? error.message : String(error),
      });
    } finally {
      clearTimeout(timeout);
      controllers.delete(controller);
      running.delete(key);
    }
  }
  function popupContent(
    title: string,
    source: string,
    note: string,
    details: Record<string, unknown>,
    url?: string,
  ) {
    const root = document.createElement("div");
    root.style.cssText =
      "max-width:280px;max-height:280px;overflow:auto;font:12px Arial;padding:5px;color:#20322a";
    const heading = document.createElement("strong");
    heading.textContent = title;
    heading.style.cssText = "display:block;font-size:15px;margin-bottom:8px";
    root.append(heading);
    const subtitle = document.createElement("p");
    subtitle.textContent = source;
    root.append(subtitle);
    const description = document.createElement("p");
    description.textContent = note;
    description.style.cssText = "font-size:11px;margin:6px 0;color:#64748b";
    root.append(description);
    for (const [key, value] of Object.entries(details)) {
      if (
        key.startsWith("_") ||
        value === null ||
        value === undefined ||
        typeof value === "object"
      )
        continue;
      const row = document.createElement("p");
      row.textContent = `${key}: ${String(value)}`;
      row.style.margin = "5px 0";
      root.append(row);
    }
    if (
      url &&
      /^https:\/\/(www\.mozgis\.gov\.mz|www\.openstreetmap\.org)\//.test(url)
    ) {
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "Consultar fonte";
      link.style.color = "#176B4A";
      root.append(link);
    }
    return root;
  }
  const click = async (event: maplibregl.MapMouseEvent) => {
    const thisClick = ++clickSerial;
    const visibleIds = [...ids.entries()]
      .filter(([k]) => desired.get(k))
      .flatMap(([, list]) => list)
      .filter(
        (id) =>
          map.getLayer(id) &&
          !id.endsWith("-label") &&
          !/^theme-(altitude|declividade)$/.test(id),
      );
    const feature = visibleIds.length
      ? map.queryRenderedFeatures(event.point, { layers: visibleIds })[0]
      : undefined;
    if (feature) {
      const key = keyBySource.get(feature.source);
      if (!key) return;
      const p = feature.properties;
      if (key === "estradas") {
  const clean = (value: unknown): string =>
    value == null ? "" : String(value).trim();

  const numberText = (value: unknown): string => {
    if (!clean(value)) return "";

    const number = Number(value);

    return Number.isFinite(number)
      ? new Intl.NumberFormat("pt-PT", {
          maximumFractionDigits: 1,
        }).format(number)
      : "";
  };

  const category = clean(p._category);
  const railway = category === "Rede ferroviária";

  const code = clean(p.No);
  const name = clean(p.Nome);

  const title = railway
    ? "Ferrovia · Corredor Beira/Moatize"
    : [
        code && code !== "N/C" ? code : "",
        name,
      ].filter(Boolean).join(" — ") || "Estrada sem nome registado";

  const details: Record<string, unknown> = {};

  const add = (label: string, value: unknown) => {
    const text = clean(value);
    if (text) details[label] = text;
  };

  add("Categoria", railway ? "Rede ferroviária" : category);

  const start = clean(railway ? p.DeCidade : p.LocalInicio);
  const end = clean(railway ? p.ParaCidade : p.LocalFim);

  if (start && end) {
    add("Ligação registada", `${start} → ${end}`);
  } else {
    add("Início registado", start);
    add("Fim registado", end);
  }

  const corridor = clean(p.NomeCorridor);

  add(
    "Corredor",
    corridor === "Beira Corridor"
      ? "Corredor da Beira"
      : corridor,
  );

  if (railway) {
    add("Identificação do corredor", p.Corridor);

    const distance = numberText(p.DistanciaKm);

    if (distance) {
      add("Extensão registada na fonte", `${distance} km`);
    }

    add(
      "Estado registado na fonte",
      clean(p.Estado) === "Operating"
        ? "Operacional — actualidade não confirmada"
        : p.Estado,
    );
  } else {
    add("Identificador do troço", p["Troço"]);

    const pavements: Record<string, string> = {
      Paved: "Pavimentado",
      Earth: "Terra",
      Gravel: "Saibro",
      Unknown: "Não informado",
    };

    const pavement = clean(p.PavimentoTipo);

    add("Pavimento registado", pavements[pavement] || pavement);

    const distance = numberText(p.Distancia);

    if (distance) {
      add(
        "Distância registada",
        `${distance} — unidade não indicada no ficheiro`,
      );
    }
  }

  popup?.remove();

  popup = new maplibregl.Popup({ maxWidth: "350px" })
    .setLngLat(event.lngLat)
    .setDOMContent(
      popupContent(
        title,
        clean(p._source) || "MozGIS / CENACARTA",
        "Dados da fonte, sem data de actualização indicada. " +
          "As extensões referem-se aos elementos originais, " +
          "que podem prolongar-se para fora do distrito.",
        details,
        clean(p._sourceUrl),
      ),
    )
    .addTo(map);

  return;
}
      let details: Record<string, unknown> = {};
      try {
        details = JSON.parse(p._details || "{}");
      } catch {
        /* Campos ainda disponíveis no nome/categoria */
      }
      popup?.remove();
      popup = new maplibregl.Popup({ maxWidth: "310px" })
        .setLngLat(event.lngLat)
        .setDOMContent(
          popupContent(
            p._title || THEMES[key].title,
            p._source || THEMES[key].source,
            THEMES[key].note,
            details,
            p._sourceUrl,
          ),
        )
        .addTo(map);
    } else if (desired.get("altitude") || desired.get("declividade")) {
      try {
        const result = await terrain.inspect(
          event.lngLat.lng,
          event.lngLat.lat,
        );
        if (disposed || thisClick !== clickSerial) return;
        popup?.remove();
        popup = new maplibregl.Popup()
          .setLngLat(event.lngLat)
          .setDOMContent(
            popupContent(
              "Relevo aproximado",
              "DEM Terrarium",
              THEMES.declividade.note,
              {
                "Altitude (m)": Number.isFinite(result.altitude)
                  ? result.altitude.toFixed(1)
                  : "Sem dados",
                "Declividade (°)": Number.isFinite(result.slope)
                  ? result.slope.toFixed(1)
                  : "Sem dados",
              },
            ),
          )
          .addTo(map);
      } catch (error) {
        if (!disposed)
          update(desired.get("declividade") ? "declividade" : "altitude", {
            state: "error",
            message: String(error),
          });
      }
    }
  };
  const onError = (event: maplibregl.ErrorEvent) => {
    const source = (event as unknown as { sourceId?: string }).sourceId;
    const key = source ? keyBySource.get(source) : undefined;
    if (key && !disposed)
      update(key, {
        state: "error",
        message: event.error?.message || "Falha num recurso desta camada",
      });
  };
  map.on("click", click);
  map.on("error", onError);
  return {
    setVisible(key: ThemeKey, visible: boolean) {
      desired.set(key, visible);
      if (visible && !loaded.has(key)) void load(key);
      else show(key);
    },
    retry(key: ThemeKey) {
      if (running.has(key)) return;
      removeLayers(key);
      void load(key);
    },
    dispose() {
      disposed = true;
      clickSerial++;
      controllers.forEach((c) => c.abort());
      popup?.remove();
      map.off("click", click);
      map.off("error", onError);
      terrain.dispose();
    },
  };
}
export { THEMES, THEME_KEYS };
